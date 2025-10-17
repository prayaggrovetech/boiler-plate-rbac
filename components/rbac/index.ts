// RBAC Hooks
export * from './hooks/use-permission'
export * from './hooks/use-role'
export * from './hooks/use-user'

// RBAC Components
export * from './permission-gate'
export * from './protected-route'
export * from './role-based-navigation'
export * from './user-avatar'

// Re-export commonly used hooks with shorter names
export { 
  useHasPermission,
  useHasAnyPermission,
  useHasAllPermissions,
  useUserPermissions
} from './hooks/use-permission'

export {
  useHasRole,
  useHasAnyRole,
  useUserRoles,
  useIsAdmin,
  useIsManagerOrAbove
} from './hooks/use-role'

export {
  useCurrentUser,
  useUserManagementPermissions,
  useDashboardPath
} from './hooks/use-user'