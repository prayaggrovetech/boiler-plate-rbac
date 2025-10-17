// Core RBAC exports
export * from './types'
export * from './permissions'
export * from './server'
export * from './routes'
export * from './utils'

// Re-export commonly used utilities
export { PermissionChecker, PermissionUtils } from './permissions'
export { 
  getCurrentUser, 
  requireAuth, 
  requirePermission, 
  requireRole,
  checkPermission,
  checkRole 
} from './server'
export { 
  getRoutePermissions, 
  isPublicRoute, 
  isAuthRoute,
  canAccessRoute,
  getDashboardRedirect 
} from './routes'
export { 
  PERMISSIONS, 
  ROLES, 
  type PermissionName, 
  type RoleName 
} from './types'
export {
  transformDatabaseRole,
  transformDatabaseUser,
  createPermissionName,
  parsePermissionName,
  groupPermissionsByResource,
  validateRoleData,
  validatePermissionData
} from './utils'