import { RoutePermission } from './types'

/**
 * Route permission configuration
 * Maps routes to required permissions for middleware protection
 */
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  // Admin routes - require admin or manager role
  {
    path: '/admin/dashboard',
    permissions: ['view:analytics', 'view:users'],
    requireAll: false // User needs ANY of these permissions
  },
  {
    path: '/admin/users',
    permissions: ['view:users', 'manage:users'],
    requireAll: false
  },
  {
    path: '/admin/roles',
    permissions: ['view:roles', 'manage:roles'],
    requireAll: false
  },
  {
    path: '/admin/settings',
    permissions: ['view:settings', 'manage:settings'],
    requireAll: false
  },

  // Manager routes - require manager role
  {
    path: '/manager/dashboard',
    permissions: ['view:analytics', 'view:users'],
    requireAll: false
  },
  {
    path: '/manager/team',
    permissions: ['view:users', 'manage:users'],
    requireAll: false
  },
  {
    path: '/manager/projects',
    permissions: ['view:analytics'],
    requireAll: false
  },
  {
    path: '/manager/reviews',
    permissions: ['view:users'],
    requireAll: false
  },

  // Customer routes - require customer role
  {
    path: '/customer/dashboard',
    permissions: ['view:profile'],
    requireAll: false
  },
  {
    path: '/customer/profile',
    permissions: ['view:profile'],
    requireAll: false
  },
  {
    path: '/customer/billing',
    permissions: ['view:subscription'],
    requireAll: false
  },
  {
    path: '/customer/analytics',
    permissions: ['view:profile'],
    requireAll: false
  },
  {
    path: '/customer/reports',
    permissions: ['view:profile'],
    requireAll: false
  },
  {
    path: '/customer/upgrade',
    permissions: ['view:subscription'],
    requireAll: false
  },

  // API routes protection
  {
    path: '/api/users',
    permissions: ['view:users', 'manage:users'],
    requireAll: false
  },
  {
    path: '/api/roles',
    permissions: ['view:roles', 'manage:roles'],
    requireAll: false
  },
  {
    path: '/api/permissions',
    permissions: ['view:roles', 'manage:roles'],
    requireAll: false
  }
]

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/login',
  '/signup',
  '/api/auth/callback/google',
  '/api/auth/callback/credentials',
  '/api/auth/signin',
  '/api/auth/signout',
  '/api/auth/session',
  '/api/auth/csrf',
  '/api/health'
]

/**
 * Auth routes that redirect authenticated users
 */
export const AUTH_ROUTES = [
  '/login',
  '/signup'
]

/**
 * Get required permissions for a route
 */
export function getRoutePermissions(pathname: string): string[] {
  // Check for exact match first
  const exactMatch = ROUTE_PERMISSIONS.find(route => route.path === pathname)
  if (exactMatch) {
    return exactMatch.permissions
  }

  // Check for pattern matches (e.g., /admin/users/123 matches /admin/users)
  const patternMatch = ROUTE_PERMISSIONS.find(route => 
    pathname.startsWith(route.path)
  )
  
  return patternMatch?.permissions || []
}

/**
 * Check if route requires all permissions or any permission
 */
export function routeRequiresAllPermissions(pathname: string): boolean {
  const route = ROUTE_PERMISSIONS.find(route => 
    route.path === pathname || pathname.startsWith(route.path)
  )
  
  return route?.requireAll || false
}

/**
 * Check if route is public (no auth required)
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => {
    if (route === pathname) return true
    if (route.includes('*')) {
      const pattern = route.replace('*', '')
      return pathname.startsWith(pattern)
    }
    return false
  })
}

/**
 * Check if route is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname)
}

/**
 * Get dashboard redirect path based on user roles
 */
export function getDashboardRedirect(userRoles: string[]): string {
  if (userRoles.includes('admin')) {
    return '/admin/dashboard'
  }
  
  if (userRoles.includes('manager')) {
    return '/manager/dashboard'
  }
  
  if (userRoles.includes('customer')) {
    return '/customer/dashboard'
  }
  
  return '/unauthorized'
}

/**
 * Check if user can access route based on roles
 */
export function canAccessRoute(pathname: string, userRoles: string[]): boolean {
  // Public routes are always accessible
  if (isPublicRoute(pathname)) {
    return true
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    return userRoles.includes('admin') || userRoles.includes('manager')
  }

  // Manager routes
  if (pathname.startsWith('/manager')) {
    return userRoles.includes('admin') || userRoles.includes('manager')
  }

  // Customer routes
  if (pathname.startsWith('/customer')) {
    return userRoles.includes('customer')
  }

  // Default to requiring authentication
  return userRoles.length > 0
}

/**
 * Route metadata for navigation generation
 */
export interface RouteMetadata {
  path: string
  title: string
  icon?: string
  permissions: string[]
  roles?: string[]
  children?: RouteMetadata[]
}

export const NAVIGATION_ROUTES: RouteMetadata[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    permissions: ['view:analytics'],
    roles: ['admin', 'manager']
  },
  {
    path: '/admin/users',
    title: 'Users',
    icon: 'Users',
    permissions: ['view:users'],
    roles: ['admin', 'manager']
  },
  {
    path: '/admin/roles',
    title: 'Roles & Permissions',
    icon: 'Shield',
    permissions: ['view:roles'],
    roles: ['admin']
  },
  {
    path: '/admin/settings',
    title: 'Settings',
    icon: 'Settings',
    permissions: ['view:settings'],
    roles: ['admin']
  },
  {
    path: '/manager/dashboard',
    title: 'Manager Dashboard',
    icon: 'LayoutDashboard',
    permissions: ['view:analytics'],
    roles: ['manager']
  },
  {
    path: '/manager/team',
    title: 'Team Management',
    icon: 'Users',
    permissions: ['view:users'],
    roles: ['manager']
  },
  {
    path: '/manager/projects',
    title: 'Projects',
    icon: 'BarChart3',
    permissions: ['view:analytics'],
    roles: ['manager']
  },
  {
    path: '/customer/dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    permissions: ['view:profile'],
    roles: ['customer']
  },
  {
    path: '/customer/profile',
    title: 'Profile',
    icon: 'User',
    permissions: ['view:profile'],
    roles: ['customer']
  },
  {
    path: '/customer/billing',
    title: 'Billing',
    icon: 'CreditCard',
    permissions: ['view:subscription'],
    roles: ['customer']
  },
  {
    path: '/customer/analytics',
    title: 'Analytics',
    icon: 'BarChart3',
    permissions: ['view:profile'],
    roles: ['customer']
  },
  {
    path: '/customer/reports',
    title: 'Reports',
    icon: 'FileText',
    permissions: ['view:profile'],
    roles: ['customer']
  }
]