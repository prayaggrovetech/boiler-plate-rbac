import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Check if user is authenticated via middleware
 */
export async function isAuthenticatedMiddleware(request: NextRequest): Promise<boolean> {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    return !!token
  } catch (error) {
    console.error('Auth check error in middleware:', error)
    return false
  }
}

/**
 * Get user token from middleware request
 */
export async function getUserToken(request: NextRequest) {
  try {
    return await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })
  } catch (error) {
    console.error('Error getting user token:', error)
    return null
  }
}

/**
 * Create login redirect with callback URL
 */
export function createLoginRedirect(request: NextRequest, pathname: string): NextResponse {
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('callbackUrl', pathname)
  return NextResponse.redirect(loginUrl)
}

/**
 * Create unauthorized redirect
 */
export function createUnauthorizedRedirect(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL('/unauthorized', request.url))
}

/**
 * Create dashboard redirect based on user roles
 */
export function createDashboardRedirect(request: NextRequest, roles: string[]): NextResponse {
  // All authenticated users go to the unified dashboard
  const dashboardPath = '/dashboard'
  
  return NextResponse.redirect(new URL(dashboardPath, request.url))
}

/**
 * Create API error response
 */
export function createApiErrorResponse(message: string, status: number = 403): NextResponse {
  return NextResponse.json(
    { 
      error: message,
      timestamp: new Date().toISOString()
    },
    { status }
  )
}