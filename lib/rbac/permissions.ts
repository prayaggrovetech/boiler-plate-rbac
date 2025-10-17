import { Role, UserWithRoles, PermissionName, RoleName } from './types'

export class PermissionChecker {
  /**
   * Check if user has a specific permission
   */
  static hasPermission(userRoles: Role[], requiredPermission: string): boolean {
    return userRoles.some(role =>
      role.permissions.some(permission =>
        permission.name === requiredPermission
      )
    )
  }

  /**
   * Check if user has any of the required permissions
   */
  static hasAnyPermission(userRoles: Role[], requiredPermissions: string[]): boolean {
    return requiredPermissions.some(permission =>
      this.hasPermission(userRoles, permission)
    )
  }

  /**
   * Check if user has all of the required permissions
   */
  static hasAllPermissions(userRoles: Role[], requiredPermissions: string[]): boolean {
    return requiredPermissions.every(permission =>
      this.hasPermission(userRoles, permission)
    )
  }

  /**
   * Check if user has a specific role
   */
  static hasRole(userRoles: Role[], roleName: string): boolean {
    return userRoles.some(role => role.name === roleName)
  }

  /**
   * Check if user has any of the specified roles
   */
  static hasAnyRole(userRoles: Role[], roleNames: string[]): boolean {
    return roleNames.some(roleName => this.hasRole(userRoles, roleName))
  }

  /**
   * Get all permission names for a user
   */
  static getUserPermissions(userRoles: Role[]): string[] {
    const permissions = new Set<string>()
    
    userRoles.forEach(role => {
      role.permissions.forEach(permission => {
        permissions.add(permission.name)
      })
    })

    return Array.from(permissions)
  }

  /**
   * Get all role names for a user
   */
  static getUserRoles(userRoles: Role[]): string[] {
    return userRoles.map(role => role.name)
  }

  /**
   * Check if user can access a resource with specific action
   */
  static canAccessResource(
    userRoles: Role[], 
    resource: string, 
    action: string
  ): boolean {
    const permissionName = `${action}:${resource}`
    return this.hasPermission(userRoles, permissionName)
  }

  /**
   * Filter permissions by resource
   */
  static getPermissionsByResource(userRoles: Role[], resource: string): string[] {
    const permissions = this.getUserPermissions(userRoles)
    return permissions.filter(permission => permission.endsWith(`:${resource}`))
  }

  /**
   * Check if user is admin (has admin role or manage permissions)
   */
  static isAdmin(userRoles: Role[]): boolean {
    return this.hasRole(userRoles, 'admin') || 
           this.hasAnyPermission(userRoles, ['manage:users', 'manage:roles'])
  }

  /**
   * Check if user is manager or above
   */
  static isManagerOrAbove(userRoles: Role[]): boolean {
    return this.hasAnyRole(userRoles, ['admin', 'manager'])
  }

  /**
   * Validate permission format (action:resource)
   */
  static isValidPermissionFormat(permission: string): boolean {
    const parts = permission.split(':')
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0
  }

  /**
   * Parse permission into action and resource
   */
  static parsePermission(permission: string): { action: string; resource: string } | null {
    if (!this.isValidPermissionFormat(permission)) {
      return null
    }
    
    const [action, resource] = permission.split(':')
    return { action, resource }
  }
}

/**
 * Utility functions for common permission checks
 */
export const PermissionUtils = {
  /**
   * Check if user can manage users
   */
  canManageUsers: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasAnyPermission(userRoles, [
      'manage:users', 
      'create:users', 
      'update:users', 
      'delete:users'
    ])
  },

  /**
   * Check if user can view users
   */
  canViewUsers: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasAnyPermission(userRoles, [
      'view:users', 
      'manage:users'
    ])
  },

  /**
   * Check if user can manage roles
   */
  canManageRoles: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasAnyPermission(userRoles, [
      'manage:roles', 
      'create:roles', 
      'update:roles', 
      'delete:roles'
    ])
  },

  /**
   * Check if user can view analytics
   */
  canViewAnalytics: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasPermission(userRoles, 'view:analytics')
  },

  /**
   * Check if user can access admin dashboard
   */
  canAccessAdminDashboard: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasAnyRole(userRoles, ['admin', 'manager'])
  },

  /**
   * Check if user can access customer dashboard
   */
  canAccessCustomerDashboard: (userRoles: Role[]): boolean => {
    return PermissionChecker.hasRole(userRoles, 'customer')
  },

  /**
   * Get dashboard path based on user roles
   */
  getDashboardPath: (userRoles: Role[]): string => {
    if (PermissionChecker.hasAnyRole(userRoles, ['admin', 'manager'])) {
      return '/admin/dashboard'
    }
    if (PermissionChecker.hasRole(userRoles, 'customer')) {
      return '/customer/dashboard'
    }
    return '/unauthorized'
  }
}