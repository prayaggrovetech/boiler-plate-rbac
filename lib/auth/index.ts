// Auth exports
export * from './config'
export * from './utils'
export * from './session'

// Re-export commonly used functions
export { auth, signIn, signOut } from './config'
export { 
  getSession, 
  getCurrentUser, 
  isAuthenticated,
  hasPermission,
  hasRole,
  requireAuth,
  requirePermission,
  requireRole 
} from './session'
export {
  hashPassword,
  verifyPassword,
  createUserWithCredentials,
  authenticateUser,
  changeUserPassword,
  signUpSchema,
  signInSchema,
  changePasswordSchema
} from './utils'