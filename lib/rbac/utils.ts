import { Role, Permission } from './types'

/**
 * Utility functions for RBAC operations
 */

/**
 * Transform database role data to our Role type
 */
export function transformDatabaseRole(dbRole: any): Role {
  return {
    id: dbRole.id,
    name: dbRole.name,
    description: dbRole.description,
    createdAt: dbRole.createdAt,
    updatedAt: dbRole.updatedAt,
    permissions: dbRole.rolePermissions?.map((rp: any) => rp.permission) || []
  }
}

/**
 * Transform database user data to include roles
 */
export function transformDatabaseUser(dbUser: any) {
  return {
    ...dbUser,
    roles: dbUser.userRoles?.map((ur: any) => transformDatabaseRole(ur.role)) || []
  }
}

/**
 * Create permission name from action and resource
 */
export function createPermissionName(action: string, resource: string): string {
  return `${action}:${resource}`
}

/**
 * Parse permission name into action and resource
 */
export function parsePermissionName(permissionName: string): { action: string; resource: string } | null {
  const parts = permissionName.split(':')
  if (parts.length !== 2) {
    return null
  }
  return {
    action: parts[0],
    resource: parts[1]
  }
}

/**
 * Group permissions by resource
 */
export function groupPermissionsByResource(permissions: Permission[]): Record<string, Permission[]> {
  return permissions.reduce((acc, permission) => {
    if (!acc[permission.resource]) {
      acc[permission.resource] = []
    }
    acc[permission.resource].push(permission)
    return acc
  }, {} as Record<string, Permission[]>)
}

/**
 * Get unique resources from permissions
 */
export function getUniqueResources(permissions: Permission[]): string[] {
  const resources = new Set(permissions.map(p => p.resource))
  return Array.from(resources).sort()
}

/**
 * Get unique actions from permissions
 */
export function getUniqueActions(permissions: Permission[]): string[] {
  const actions = new Set(permissions.map(p => p.action))
  return Array.from(actions).sort()
}

/**
 * Check if permission exists in list
 */
export function hasPermissionInList(permissions: Permission[], permissionName: string): boolean {
  return permissions.some(p => p.name === permissionName)
}

/**
 * Filter permissions by action
 */
export function filterPermissionsByAction(permissions: Permission[], action: string): Permission[] {
  return permissions.filter(p => p.action === action)
}

/**
 * Filter permissions by resource
 */
export function filterPermissionsByResource(permissions: Permission[], resource: string): Permission[] {
  return permissions.filter(p => p.resource === resource)
}

/**
 * Sort permissions by resource then action
 */
export function sortPermissions(permissions: Permission[]): Permission[] {
  return [...permissions].sort((a, b) => {
    if (a.resource !== b.resource) {
      return a.resource.localeCompare(b.resource)
    }
    return a.action.localeCompare(b.action)
  })
}

/**
 * Validate role data
 */
export function validateRoleData(data: { name: string; description?: string }): string[] {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Role name is required')
  }
  
  if (data.name && data.name.length > 50) {
    errors.push('Role name must be 50 characters or less')
  }
  
  if (data.description && data.description.length > 255) {
    errors.push('Role description must be 255 characters or less')
  }
  
  return errors
}

/**
 * Validate permission data
 */
export function validatePermissionData(data: { 
  name: string
  resource: string
  action: string
  description?: string 
}): string[] {
  const errors: string[] = []
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Permission name is required')
  }
  
  if (!data.resource || data.resource.trim().length === 0) {
    errors.push('Resource is required')
  }
  
  if (!data.action || data.action.trim().length === 0) {
    errors.push('Action is required')
  }
  
  if (data.name && !data.name.includes(':')) {
    errors.push('Permission name must follow format "action:resource"')
  }
  
  if (data.name && data.name !== createPermissionName(data.action, data.resource)) {
    errors.push('Permission name must match "action:resource" format')
  }
  
  return errors
}

/**
 * Generate default permissions for a resource
 */
export function generateDefaultPermissions(resource: string): Omit<Permission, 'id' | 'createdAt'>[] {
  const actions = ['view', 'create', 'update', 'delete']
  
  return actions.map(action => ({
    name: createPermissionName(action, resource),
    resource,
    action,
    description: `${action.charAt(0).toUpperCase() + action.slice(1)} ${resource}`
  }))
}

/**
 * Check if user has hierarchical permission (e.g., manage includes all other actions)
 */
export function hasHierarchicalPermission(
  userPermissions: string[], 
  requiredPermission: string
): boolean {
  // Direct permission check
  if (userPermissions.includes(requiredPermission)) {
    return true
  }
  
  const parsed = parsePermissionName(requiredPermission)
  if (!parsed) return false
  
  // Check for manage permission (highest level)
  const managePermission = createPermissionName('manage', parsed.resource)
  if (userPermissions.includes(managePermission)) {
    return true
  }
  
  return false
}