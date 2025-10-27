import { PermissionChecker, PermissionUtils } from '@/lib/rbac/permissions'
import { Role } from '@/lib/rbac/types'

describe('PermissionChecker', () => {
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      permissions: [
        {
          id: '1',
          name: 'manage:users',
          resource: 'users',
          action: 'manage',
          description: 'Manage users'
        },
        {
          id: '2',
          name: 'view:analytics',
          resource: 'analytics',
          action: 'view',
          description: 'View analytics'
        }
      ]
    },
    {
      id: '2',
      name: 'customer',
      description: 'Customer',
      permissions: [
        {
          id: '3',
          name: 'view:profile',
          resource: 'profile',
          action: 'view',
          description: 'View profile'
        }
      ]
    }
  ]

  describe('hasPermission', () => {
    it('should return true when user has the required permission', () => {
      const result = PermissionChecker.hasPermission(mockRoles, 'manage:users')
      expect(result).toBe(true)
    })

    it('should return false when user does not have the required permission', () => {
      const result = PermissionChecker.hasPermission(mockRoles, 'delete:users')
      expect(result).toBe(false)
    })

    it('should return false for empty roles array', () => {
      const result = PermissionChecker.hasPermission([], 'manage:users')
      expect(result).toBe(false)
    })
  })

  describe('hasAnyPermission', () => {
    it('should return true when user has at least one of the required permissions', () => {
      const result = PermissionChecker.hasAnyPermission(mockRoles, ['manage:users', 'delete:users'])
      expect(result).toBe(true)
    })

    it('should return false when user has none of the required permissions', () => {
      const result = PermissionChecker.hasAnyPermission(mockRoles, ['delete:users', 'create:posts'])
      expect(result).toBe(false)
    })
  })

  describe('hasAllPermissions', () => {
    it('should return true when user has all required permissions', () => {
      const result = PermissionChecker.hasAllPermissions(mockRoles, ['manage:users', 'view:analytics'])
      expect(result).toBe(true)
    })

    it('should return false when user is missing some required permissions', () => {
      const result = PermissionChecker.hasAllPermissions(mockRoles, ['manage:users', 'delete:users'])
      expect(result).toBe(false)
    })
  })

  describe('hasRole', () => {
    it('should return true when user has the specified role', () => {
      const result = PermissionChecker.hasRole(mockRoles, 'admin')
      expect(result).toBe(true)
    })

    it('should return false when user does not have the specified role', () => {
      const result = PermissionChecker.hasRole(mockRoles, 'manager')
      expect(result).toBe(false)
    })
  })

  describe('isAdmin', () => {
    it('should return true for admin role', () => {
      const result = PermissionChecker.isAdmin(mockRoles)
      expect(result).toBe(true)
    })

    it('should return false for non-admin roles', () => {
      const customerRoles = mockRoles.filter(role => role.name === 'customer')
      const result = PermissionChecker.isAdmin(customerRoles)
      expect(result).toBe(false)
    })
  })
})

describe('PermissionUtils', () => {
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'admin',
      description: 'Administrator',
      permissions: [
        {
          id: '1',
          name: 'manage:users',
          resource: 'users',
          action: 'manage',
          description: 'Manage users'
        }
      ]
    }
  ]

  describe('canManageUsers', () => {
    it('should return true when user can manage users', () => {
      const result = PermissionUtils.canManageUsers(mockRoles)
      expect(result).toBe(true)
    })
  })

  describe('getDashboardPath', () => {
    it('should return admin dashboard for admin role', () => {
      const result = PermissionUtils.getDashboardPath(mockRoles)
      expect(result).toBe('/admin/dashboard')
    })

    it('should return unauthorized for no roles', () => {
      const result = PermissionUtils.getDashboardPath([])
      expect(result).toBe('/unauthorized')
    })
  })
})