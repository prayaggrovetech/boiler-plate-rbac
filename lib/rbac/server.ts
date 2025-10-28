import { auth } from '@/lib/auth'
import { getUserWithRoles } from '@/lib/db/users'
import { PermissionChecker } from './permissions'
import { UserWithRoles, Role } from './types'
import { redirect } from 'next/navigation'

/**
 * Server-side permission validation utilities
 */

/**
 * Get current user with roles from server session
 */
export async function getCurrentUser(): Promise<UserWithRoles | null> {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return null
    }

    const userWithRoles = await getUserWithRoles(session.user.id)
    
    if (!userWithRoles) {
      return null
    }

    // Transform database result to match our types
    const roles: Role[] = userWithRoles.userRoles.map(userRole => ({
      id: userRole.role.id,
      name: userRole.role.name,
      description: userRole.role.description,
      createdAt: userRole.role.createdAt,
      updatedAt: userRole.role.updatedAt,
      permissions: userRole.role.rolePermissions.map(rp => rp.permission)
    }))

    return {
      ...userWithRoles,
      roles
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth(): Promise<UserWithRoles> {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
}

/**
 * Require specific permission - redirect to unauthorized if not allowed
 */
export async function requirePermission(permission: string): Promise<UserWithRoles> {
  const user = await requireAuth()
  
  if (!PermissionChecker.hasPermission(user.roles, permission)) {
    redirect('/unauthorized')
  }
  
  return user
}

/**
 * Require any of the specified permissions
 */
export async function requireAnyPermission(permissions: string[]): Promise<UserWithRoles> {
  const user = await requireAuth()
  
  if (!PermissionChecker.hasAnyPermission(user.roles, permissions)) {
    redirect('/unauthorized')
  }
  
  return user
}

/**
 * Require all of the specified permissions
 */
export async function requireAllPermissions(permissions: string[]): Promise<UserWithRoles> {
  const user = await requireAuth()
  
  if (!PermissionChecker.hasAllPermissions(user.roles, permissions)) {
    redirect('/unauthorized')
  }
  
  return user
}

/**
 * Require specific role
 */
export async function requireRole(roleName: string): Promise<UserWithRoles> {
  const user = await requireAuth()
  
  if (!PermissionChecker.hasRole(user.roles, roleName)) {
    redirect('/unauthorized')
  }
  
  return user
}

/**
 * Require any of the specified roles
 */
export async function requireAnyRole(roleNames: string[]): Promise<UserWithRoles> {
  const user = await requireAuth()
  
  if (!PermissionChecker.hasAnyRole(user.roles, roleNames)) {
    redirect('/unauthorized')
  }
  
  return user
}

/**
 * Check permission without redirecting - returns boolean
 */
export async function checkPermission(permission: string): Promise<boolean> {
  const user = await getCurrentUser()
  
  if (!user) {
    return false
  }
  
  return PermissionChecker.hasPermission(user.roles, permission)
}

/**
 * Check if current user has any of the specified permissions
 */
export async function checkAnyPermission(permissions: string[]): Promise<boolean> {
  const user = await getCurrentUser()
  
  if (!user) {
    return false
  }
  
  return PermissionChecker.hasAnyPermission(user.roles, permissions)
}

/**
 * Check if current user has specific role
 */
export async function checkRole(roleName: string): Promise<boolean> {
  const user = await getCurrentUser()
  
  if (!user) {
    return false
  }
  
  return PermissionChecker.hasRole(user.roles, roleName)
}

/**
 * Get current user's permissions
 */
export async function getCurrentUserPermissions(): Promise<string[]> {
  const user = await getCurrentUser()
  
  if (!user) {
    return []
  }
  
  return PermissionChecker.getUserPermissions(user.roles)
}

/**
 * Get current user's roles
 */
export async function getCurrentUserRoles(): Promise<string[]> {
  const user = await getCurrentUser()
  
  if (!user) {
    return []
  }
  
  return PermissionChecker.getUserRoles(user.roles)
}

/**
 * Admin-only access helper
 */
export async function requireAdmin(): Promise<UserWithRoles> {
  return await requireRole('admin')
}

/**
 * Manager or admin access helper
 */
export async function requireManagerOrAdmin(): Promise<UserWithRoles> {
  return await requireAnyRole(['admin', 'manager'])
}

/**
 * Customer access helper
 */
export async function requireCustomer(): Promise<UserWithRoles> {
  return await requireRole('customer')
}