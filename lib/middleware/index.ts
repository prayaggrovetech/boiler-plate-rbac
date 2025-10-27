import { NextRequest, NextResponse } from 'next/server'
import { 
  isAuthenticatedMiddleware, 
  getUserToken, 
  createLoginRedirect, 
  createUnauthorizedRedirect,
  createDashboardRedirect,
  createApiErrorResponse 
} from './auth'
import { applySecurityHeaders } from '@/lib/security/headers'
import { apiRateLimit, authRateLimit, createRateLimitHeaders } from '@/lib/security/rate-limit'
import { 
  hasRoutePermissions, 
  canAccessAdminRoutes, 
  canAccessManagerRoutes,
  canAccessCustomerRoutes,
  hasApiPermissions,
  getUserRolesFromToken,
  requiresAuthentication,
  logAccessAttempt 
} from './permissions'
import { 
  debugMiddleware, 
  MiddlewarePerformanceMonitor, 
  logSecurityEvent,
  RateLimitMonitor 
} from './debug'
import { isPublicRoute, isAuthRoute, getRoutePermissions } from '@/lib/rbac/routes'

/**
 * Main middleware handler with comprehensive route protection
 */
export async function handleMiddleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  const requestId = MiddlewarePerformanceMonitor.generateRequestId()
  
  // Start performance monitoring
  MiddlewarePerformanceMonitor.start(requestId)
  
  try {
    // Apply rate limiting
    let rateLimitResult
    if (pathname.startsWith('/api/auth/') || pathname === '/login' || pathname === '/signup') {
      // Stricter rate limiting for auth endpoints
      rateLimitResult = authRateLimit.isAllowed(request)
    } else if (pathname.startsWith('/api/')) {
      // General API rate limiting
      rateLimitResult = apiRateLimit.isAllowed(request)
    }

    if (rateLimitResult && !rateLimitResult.allowed) {
      logSecurityEvent(request, {
        type: 'suspicious_activity',
        pathname,
        userRoles: [],
        details: { reason: 'rate_limit_exceeded' }
      })
      
      const response = pathname.startsWith('/api/') 
        ? createApiErrorResponse('Rate limit exceeded', 429)
        : createUnauthorizedRedirect(request)
      
      // Add rate limit headers
      const headers = createRateLimitHeaders(rateLimitResult)
      Object.entries(headers).forEach(([key, value]) => {
        response.headers.set(key, value)
      })
      
      return response
    }
    // Skip middleware for static files and certain API routes
    if (shouldSkipMiddleware(pathname)) {
      return NextResponse.next()
    }

    // Get user authentication status and token
    const token = await getUserToken(request)
    const isAuthenticated = !!token
    const userRoles = getUserRolesFromToken(token)
    const roleNames = userRoles.map((role: any) => role.name)

    // Handle public routes
    if (isPublicRoute(pathname)) {
      return handlePublicRoute(request, pathname, isAuthenticated, roleNames)
    }

    // Check authentication requirement
    if (!isAuthenticated && requiresAuthentication(pathname)) {
      return createLoginRedirect(request, pathname)
    }

    // Handle API routes
    if (pathname.startsWith('/api/')) {
      return handleApiRoute(request, pathname, userRoles)
    }

    // Let the dashboard page handle its own redirect to avoid conflicts

    // Handle dashboard routes
    if (pathname === '/dashboard' || pathname.startsWith('/admin/') || pathname.startsWith('/manager/') || pathname.startsWith('/customer/')) {
      return handleDashboardRoute(request, pathname, userRoles, roleNames)
    }

    // Check specific route permissions
    const hasAccess = hasRoutePermissions(userRoles, pathname)
    
    if (!hasAccess) {
      logAccessAttempt(pathname, roleNames, false)
      return createUnauthorizedRedirect(request)
    }

    // Debug successful access
    debugMiddleware(request, {
      userRoles: roleNames,
      requiredPermissions: getRoutePermissions(pathname),
      hasAccess: true,
      action: 'allow'
    })
    
    logAccessAttempt(pathname, roleNames, true)
    
    // Apply security headers to the response
    const response = NextResponse.next()
    return applySecurityHeaders(response)

  } catch (error) {
    console.error('Middleware error:', error)
    
    // On error, redirect to appropriate page based on route type
    if (pathname.startsWith('/api/')) {
      return createApiErrorResponse('Internal server error', 500)
    }
    
    return createLoginRedirect(request, pathname)
  } finally {
    // End performance monitoring
    MiddlewarePerformanceMonitor.end(requestId, pathname)
    
    // Periodic cleanup of rate limit data
    if (Math.random() < 0.01) { // 1% chance to run cleanup
      RateLimitMonitor.cleanup()
    }
  }
}

/**
 * Check if middleware should be skipped for this path
 */
function shouldSkipMiddleware(pathname: string): boolean {
  const skipPatterns = [
    '/_next/',
    '/favicon.ico',
    '/api/auth/',
    '/api/health'
  ]
  
  return skipPatterns.some(pattern => pathname.startsWith(pattern))
}

/**
 * Handle public route access
 */
function handlePublicRoute(
  request: NextRequest, 
  pathname: string, 
  isAuthenticated: boolean, 
  roleNames: string[]
): NextResponse {
  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthenticated && isAuthRoute(pathname)) {
    return createDashboardRedirect(request, roleNames)
  }
  
  return NextResponse.next()
}

/**
 * Handle API route access
 */
function handleApiRoute(
  request: NextRequest, 
  pathname: string, 
  userRoles: any[]
): NextResponse {
  const hasAccess = hasApiPermissions(userRoles, pathname)
  
  if (!hasAccess) {
    const roleNames = userRoles.map((role: any) => role.name)
    logAccessAttempt(pathname, roleNames, false)
    return createApiErrorResponse('Insufficient permissions')
  }
  
  return NextResponse.next()
}

/**
 * Handle dashboard route access
 */
function handleDashboardRoute(
  request: NextRequest, 
  pathname: string, 
  userRoles: any[], 
  roleNames: string[]
): NextResponse {
  // Handle centralized dashboard - allow access if user has any valid role
  if (pathname === '/dashboard') {
    if (roleNames.length === 0) {
      logAccessAttempt(pathname, roleNames, false)
      return createUnauthorizedRedirect(request)
    }
    logAccessAttempt(pathname, roleNames, true)
    return NextResponse.next()
  }
  
  // Check admin routes
  if (pathname.startsWith('/admin/')) {
    if (!canAccessAdminRoutes(userRoles)) {
      logAccessAttempt(pathname, roleNames, false)
      return createUnauthorizedRedirect(request)
    }
  }
  
  // Check manager routes
  if (pathname.startsWith('/manager/')) {
    if (!canAccessManagerRoutes(userRoles)) {
      logAccessAttempt(pathname, roleNames, false)
      return createUnauthorizedRedirect(request)
    }
  }
  
  // Check customer routes
  if (pathname.startsWith('/customer/')) {
    if (!canAccessCustomerRoutes(userRoles)) {
      logAccessAttempt(pathname, roleNames, false)
      return createUnauthorizedRedirect(request)
    }
  }
  
  // Check specific route permissions
  const hasAccess = hasRoutePermissions(userRoles, pathname)
  
  if (!hasAccess) {
    logAccessAttempt(pathname, roleNames, false)
    return createUnauthorizedRedirect(request)
  }
  
  logAccessAttempt(pathname, roleNames, true)
  return NextResponse.next()
}

// Export utilities for use in other middleware
export * from './auth'
export * from './permissions'
export * from './debug'
export * from './testing'