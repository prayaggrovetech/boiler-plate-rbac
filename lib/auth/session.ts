import { getServerSession } from "next-auth"
import { authConfig } from "./config"
import { getUserWithRoles } from "@/lib/db/users"
import { transformDatabaseUser } from "@/lib/rbac/utils"
import { UserWithRoles } from "@/lib/rbac/types"

/**
 * Get current session on server side
 */
export async function getSession() {
  return await getServerSession(authConfig)
}

/**
 * Get current user with roles from session
 */
export async function getCurrentUser(): Promise<UserWithRoles | null> {
  try {
    const session = await getSession()
    
    if (!session?.user?.id) {
      return null
    }

    // Get fresh user data with roles from database
    const userWithRoles = await getUserWithRoles(session.user.id)
    
    if (!userWithRoles) {
      return null
    }

    return transformDatabaseUser(userWithRoles)
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session?.user
}

/**
 * Get current user's permissions
 */
export async function getCurrentUserPermissions(): Promise<string[]> {
  const user = await getCurrentUser()
  
  if (!user) {
    return []
  }

  const permissions = new Set<string>()
  user.roles.forEach(role => {
    role.permissions.forEach(permission => {
      permissions.add(permission.name)
    })
  })

  return Array.from(permissions)
}

/**
 * Get current user's roles
 */
export async function getCurrentUserRoles(): Promise<string[]> {
  const user = await getCurrentUser()
  
  if (!user) {
    return []
  }

  return user.roles.map(role => role.name)
}

/**
 * Check if current user has specific permission
 */
export async function hasPermission(permission: string): Promise<boolean> {
  const permissions = await getCurrentUserPermissions()
  return permissions.includes(permission)
}

/**
 * Check if current user has any of the specified permissions
 */
export async function hasAnyPermission(permissions: string[]): Promise<boolean> {
  const userPermissions = await getCurrentUserPermissions()
  return permissions.some(permission => userPermissions.includes(permission))
}

/**
 * Check if current user has all of the specified permissions
 */
export async function hasAllPermissions(permissions: string[]): Promise<boolean> {
  const userPermissions = await getCurrentUserPermissions()
  return permissions.every(permission => userPermissions.includes(permission))
}

/**
 * Check if current user has specific role
 */
export async function hasRole(roleName: string): Promise<boolean> {
  const roles = await getCurrentUserRoles()
  return roles.includes(roleName)
}

/**
 * Check if current user has any of the specified roles
 */
export async function hasAnyRole(roleNames: string[]): Promise<boolean> {
  const userRoles = await getCurrentUserRoles()
  return roleNames.some(role => userRoles.includes(role))
}

/**
 * Require authentication - throw error if not authenticated
 */
export async function requireAuth(): Promise<UserWithRoles> {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error("Authentication required")
  }
  
  return user
}

/**
 * Require specific permission - throw error if not authorized
 */
export async function requirePermission(permission: string): Promise<UserWithRoles> {
  const user = await requireAuth()
  const hasRequiredPermission = await hasPermission(permission)
  
  if (!hasRequiredPermission) {
    throw new Error(`Permission required: ${permission}`)
  }
  
  return user
}

/**
 * Require specific role - throw error if not authorized
 */
export async function requireRole(roleName: string): Promise<UserWithRoles> {
  const user = await requireAuth()
  const hasRequiredRole = await hasRole(roleName)
  
  if (!hasRequiredRole) {
    throw new Error(`Role required: ${roleName}`)
  }
  
  return user
}

/**
 * Get session user data for client components
 */
export function getSessionUser(session: any) {
  if (!session?.user) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    roles: session.user.roles || [],
    permissions: session.user.permissions || []
  }
}