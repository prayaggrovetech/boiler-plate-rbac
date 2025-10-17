import { NextRequest } from 'next/server'

/**
 * Debug utilities for middleware development
 */

export interface MiddlewareDebugInfo {
  pathname: string
  method: string
  userAgent?: string
  referer?: string
  timestamp: string
  userRoles: string[]
  requiredPermissions: string[]
  hasAccess: boolean
  action: 'allow' | 'redirect' | 'block'
  redirectTo?: string
}

/**
 * Log detailed middleware debug information
 */
export function debugMiddleware(
  request: NextRequest,
  debugInfo: Partial<MiddlewareDebugInfo>
) {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const info: MiddlewareDebugInfo = {
    pathname: request.nextUrl.pathname,
    method: request.method,
    userAgent: request.headers.get('user-agent') || undefined,
    referer: request.headers.get('referer') || undefined,
    timestamp: new Date().toISOString(),
    userRoles: [],
    requiredPermissions: [],
    hasAccess: false,
    action: 'block',
    ...debugInfo
  }

  console.log('🛡️  Middleware Debug Info:')
  console.log(`   Path: ${info.pathname}`)
  console.log(`   Method: ${info.method}`)
  console.log(`   User Roles: [${info.userRoles.join(', ')}]`)
  console.log(`   Required Permissions: [${info.requiredPermissions.join(', ')}]`)
  console.log(`   Has Access: ${info.hasAccess}`)
  console.log(`   Action: ${info.action}`)
  
  if (info.redirectTo) {
    console.log(`   Redirect To: ${info.redirectTo}`)
  }
  
  console.log(`   Timestamp: ${info.timestamp}`)
  console.log('---')
}

/**
 * Performance monitoring for middleware
 */
export class MiddlewarePerformanceMonitor {
  private static timers = new Map<string, number>()

  static start(requestId: string) {
    this.timers.set(requestId, Date.now())
  }

  static end(requestId: string, pathname: string) {
    const startTime = this.timers.get(requestId)
    if (startTime) {
      const duration = Date.now() - startTime
      this.timers.delete(requestId)
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️  Middleware Performance: ${pathname} took ${duration}ms`)
      }
      
      // Log slow requests
      if (duration > 100) {
        console.warn(`🐌 Slow middleware execution: ${pathname} took ${duration}ms`)
      }
    }
  }

  static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

/**
 * Security event logging
 */
export interface SecurityEvent {
  type: 'unauthorized_access' | 'permission_denied' | 'auth_failure' | 'suspicious_activity'
  pathname: string
  userRoles: string[]
  userAgent?: string
  ip?: string
  timestamp: string
  details?: Record<string, any>
}

export function logSecurityEvent(
  request: NextRequest,
  event: Omit<SecurityEvent, 'timestamp' | 'userAgent' | 'ip'>
) {
  const securityEvent: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || undefined,
    ip: request.ip || request.headers.get('x-forwarded-for') || undefined
  }

  // In production, you would send this to a security monitoring service
  console.warn('🚨 Security Event:', securityEvent)
  
  // For development, also log to console with formatting
  if (process.env.NODE_ENV === 'development') {
    console.log('🚨 Security Event Details:')
    console.log(`   Type: ${securityEvent.type}`)
    console.log(`   Path: ${securityEvent.pathname}`)
    console.log(`   User Roles: [${securityEvent.userRoles.join(', ')}]`)
    console.log(`   IP: ${securityEvent.ip}`)
    console.log(`   User Agent: ${securityEvent.userAgent}`)
    console.log(`   Timestamp: ${securityEvent.timestamp}`)
    if (securityEvent.details) {
      console.log(`   Details:`, securityEvent.details)
    }
    console.log('---')
  }
}

/**
 * Rate limiting detection (basic implementation)
 */
export class RateLimitMonitor {
  private static requests = new Map<string, number[]>()
  private static readonly WINDOW_MS = 60000 // 1 minute
  private static readonly MAX_REQUESTS = 100 // per window

  static checkRateLimit(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.WINDOW_MS
    
    // Get existing requests for this identifier
    const requests = this.requests.get(identifier) || []
    
    // Filter out old requests
    const recentRequests = requests.filter(time => time > windowStart)
    
    // Add current request
    recentRequests.push(now)
    
    // Update the map
    this.requests.set(identifier, recentRequests)
    
    // Check if rate limit exceeded
    return recentRequests.length <= this.MAX_REQUESTS
  }

  static cleanup() {
    // Periodically clean up old entries
    const now = Date.now()
    const windowStart = now - this.WINDOW_MS
    
    for (const [identifier, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(time => time > windowStart)
      if (recentRequests.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, recentRequests)
      }
    }
  }
}