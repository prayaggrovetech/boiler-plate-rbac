import { NextRequest } from 'next/server'

/**
 * Middleware testing utilities for development
 */

/**
 * Create a mock NextRequest for testing middleware
 */
export function createMockRequest(
  pathname: string, 
  baseUrl: string = 'http://localhost:3000'
): NextRequest {
  const url = new URL(pathname, baseUrl)
  return new NextRequest(url)
}

/**
 * Test route access with different user roles
 */
export interface RouteTestCase {
  path: string
  roles: string[]
  expectedStatus: 'allow' | 'redirect' | 'unauthorized'
  description: string
}

export const MIDDLEWARE_TEST_CASES: RouteTestCase[] = [
  // Public routes
  {
    path: '/',
    roles: [],
    expectedStatus: 'allow',
    description: 'Public home page should be accessible to everyone'
  },
  {
    path: '/about',
    roles: [],
    expectedStatus: 'allow',
    description: 'Public about page should be accessible to everyone'
  },
  {
    path: '/login',
    roles: [],
    expectedStatus: 'allow',
    description: 'Login page should be accessible to unauthenticated users'
  },
  {
    path: '/login',
    roles: ['customer'],
    expectedStatus: 'redirect',
    description: 'Authenticated users should be redirected from login page'
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    roles: [],
    expectedStatus: 'redirect',
    description: 'Unauthenticated users should be redirected to login'
  },
  {
    path: '/admin/dashboard',
    roles: ['customer'],
    expectedStatus: 'unauthorized',
    description: 'Customers should not access admin dashboard'
  },
  {
    path: '/admin/dashboard',
    roles: ['admin'],
    expectedStatus: 'allow',
    description: 'Admins should access admin dashboard'
  },
  {
    path: '/admin/dashboard',
    roles: ['manager'],
    expectedStatus: 'allow',
    description: 'Managers should access admin dashboard'
  },

  // Customer routes
  {
    path: '/customer/dashboard',
    roles: [],
    expectedStatus: 'redirect',
    description: 'Unauthenticated users should be redirected to login'
  },
  {
    path: '/customer/dashboard',
    roles: ['admin'],
    expectedStatus: 'unauthorized',
    description: 'Admins should not access customer dashboard'
  },
  {
    path: '/customer/dashboard',
    roles: ['customer'],
    expectedStatus: 'allow',
    description: 'Customers should access customer dashboard'
  },

  // API routes
  {
    path: '/api/users',
    roles: [],
    expectedStatus: 'redirect',
    description: 'API routes should require authentication'
  },
  {
    path: '/api/users',
    roles: ['customer'],
    expectedStatus: 'unauthorized',
    description: 'Customers should not access user management API'
  },
  {
    path: '/api/users',
    roles: ['admin'],
    expectedStatus: 'allow',
    description: 'Admins should access user management API'
  },

  // Health check (public API)
  {
    path: '/api/health',
    roles: [],
    expectedStatus: 'allow',
    description: 'Health check should be publicly accessible'
  }
]

/**
 * Log middleware test results
 */
export function logTestResult(
  testCase: RouteTestCase, 
  actualResult: string, 
  passed: boolean
) {
  const status = passed ? '✅ PASS' : '❌ FAIL'
  console.log(`${status} ${testCase.path} (${testCase.roles.join(',') || 'anonymous'})`)
  console.log(`  Expected: ${testCase.expectedStatus}, Got: ${actualResult}`)
  console.log(`  ${testCase.description}`)
  console.log('')
}

/**
 * Validate middleware configuration
 */
export function validateMiddlewareConfig() {
  const issues: string[] = []
  
  // Check environment variables
  if (!process.env.NEXTAUTH_SECRET) {
    issues.push('NEXTAUTH_SECRET environment variable is not set')
  }
  
  // Check route configuration
  const publicRoutes = ['/', '/about', '/contact', '/login', '/signup']
  const protectedRoutes = ['/admin/dashboard', '/customer/dashboard']
  
  console.log('🔍 Middleware Configuration Check')
  console.log('Public routes:', publicRoutes.join(', '))
  console.log('Protected routes:', protectedRoutes.join(', '))
  
  if (issues.length > 0) {
    console.log('⚠️  Configuration Issues:')
    issues.forEach(issue => console.log(`  - ${issue}`))
  } else {
    console.log('✅ Configuration looks good')
  }
  
  return issues.length === 0
}