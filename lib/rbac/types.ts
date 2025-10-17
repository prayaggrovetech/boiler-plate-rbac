import { User, Role, Permission } from '@prisma/client'

// Core RBAC interfaces
export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description?: string
  createdAt: Date
}

export interface Role {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  permissions: Permission[]
}

export interface UserWithRoles extends User {
  roles: Role[]
}

// Extended types for database operations
export type RoleWithPermissions = Role & {
  rolePermissions: Array<{
    permission: Permission
  }>
}

export type UserWithFullRoles = User & {
  userRoles: Array<{
    role: RoleWithPermissions
  }>
}

// Permission checking types
export type PermissionCheck = {
  resource: string
  action: string
}

export type RoutePermission = {
  path: string
  permissions: string[]
  requireAll?: boolean // If true, user must have ALL permissions. If false, user needs ANY permission
}

// RBAC context types for React
export interface RBACContextType {
  user: UserWithRoles | null
  permissions: string[]
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  hasAllPermissions: (permissions: string[]) => boolean
  hasRole: (roleName: string) => boolean
  isLoading: boolean
}

// Hook return types
export interface UsePermissionResult {
  hasPermission: boolean
  isLoading: boolean
}

export interface UseRoleResult {
  hasRole: boolean
  roles: string[]
  isLoading: boolean
}

// Permission constants
export const PERMISSIONS = {
  // User management
  VIEW_USERS: 'view:users',
  CREATE_USERS: 'create:users',
  UPDATE_USERS: 'update:users',
  DELETE_USERS: 'delete:users',
  MANAGE_USERS: 'manage:users',

  // Role management
  VIEW_ROLES: 'view:roles',
  CREATE_ROLES: 'create:roles',
  UPDATE_ROLES: 'update:roles',
  DELETE_ROLES: 'delete:roles',
  MANAGE_ROLES: 'manage:roles',

  // Analytics
  VIEW_ANALYTICS: 'view:analytics',
  EXPORT_ANALYTICS: 'export:analytics',

  // Profile
  VIEW_PROFILE: 'view:profile',
  UPDATE_PROFILE: 'update:profile',

  // Subscription
  VIEW_SUBSCRIPTION: 'view:subscription',
  MANAGE_SUBSCRIPTION: 'manage:subscription',

  // Settings
  VIEW_SETTINGS: 'view:settings',
  MANAGE_SETTINGS: 'manage:settings',
} as const

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CUSTOMER: 'customer',
} as const

export type PermissionName = typeof PERMISSIONS[keyof typeof PERMISSIONS]
export type RoleName = typeof ROLES[keyof typeof ROLES]