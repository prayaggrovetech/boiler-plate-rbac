import { NextRequest } from 'next/server'
import { PermissionChecker } from '@/lib/rbac/permissions'
import { getRoutePermissions, routeRequiresAllPermissions } from '@/lib/rbac/routes'

/**
 * Check if user has required permissions for a route
 */
export function hasRoutePermissions(
  userRoles: any[], 
  pathname: string
): boolean {
  const requiredPermissions = getRoutePermissions(pathname)
  
  if (requiredPermissions.length === 0) {
    return true // No specific permissions required
  }
  
  const requireAll = routeRequiresAllPermissions(pathname)
  
  return requireAll
    ? PermissionChecker.hasAllPermissions(userRoles, requiredPermissions)
    : PermissionChecker.hasAnyPermission(userRoles, requiredPermissions)
}

/**
 * Check admin route access
 */
export function canAccessAdminRoutes(userRoles: any[]): boolean {
  return PermissionChecker.hasAnyRole(userRoles, ['admin', 'manager'])
}

/**
 * Check manager route access
 */
export function canAccessManagerRoutes(userRoles: any[]): boolean {
  return PermissionChecker.hasAnyRole(userRoles, ['admin', 'manager'])
}

/**
 * Check customer route access
 */
export function canAccessCustomerRoutes(userRoles: any[]): boolean {
  return PermissionChecker.hasRole(userRoles, 'customer')
}

/**
 * Check API route permissions
 */
export function hasApiPermissions(
  userRoles: any[], 
  pathname: string
): boolean {
  // Special handling for API routes
  const requiredPermissions = getRoutePermissions(pathname)
  
  if (requiredPermissions.length === 0) {
    return true // Public API route
  }
  
  const requireAll = routeRequiresAllPermissions(pathname)
  
  return requireAll
    ? PermissionChecker.hasAllPermissions(userRoles, requiredPermissions)
    : PermissionChecker.hasAnyPermission(userRoles, requiredPermissions)
}

/**
 * Get user roles from token
 */
export function getUserRolesFromToken(token: any): any[] {
  return token?.roles || []
}

/**
 * Check if route requires authentication
 */
export function requiresAuthentication(pathname: string): boolean {
  // Public routes that don't require auth
  const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/login',
    '/signup',
    '/auth/error',
    '/api/auth',
    '/api/health'
  ]
  
  return !publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
}

/**
 * Log access attempt for debugging
 */
export function logAccessAttempt(
  pathname: string, 
  userRoles: string[], 
  hasAccess: boolean,
  requiredPermissions: string[] = []
) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Access attempt: ${pathname}`)
    console.log(`User roles: ${userRoles.join(', ')}`)
    console.log(`Required permissions: ${requiredPermissions.join(', ')}`)
    console.log(`Access granted: ${hasAccess}`)
  }
}