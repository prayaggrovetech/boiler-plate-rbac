"use client"

import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { PermissionUtils } from "@/lib/rbac/permissions"

/**
 * Hook to get current user information with roles and permissions
 */
export function useCurrentUser() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { 
        user: null, 
        permissions: [], 
        roleNames: [],
        isLoading: true,
        isAuthenticated: false
      }
    }
    
    if (!session?.user) {
      return { 
        user: null, 
        permissions: [], 
        roleNames: [],
        isLoading: false,
        isAuthenticated: false
      }
    }
    
    const user = session.user
    const permissions = session.user.permissions || []
    const roleNames = session.user.roles?.map(role => role.name) || []
    
    return { 
      user, 
      permissions, 
      roleNames,
      isLoading: false,
      isAuthenticated: true
    }
  }, [session, status])
  
  return result
}

/**
 * Hook for common user management permissions
 */
export function useUserManagementPermissions() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return {
        canViewUsers: false,
        canManageUsers: false,
        canViewRoles: false,
        canManageRoles: false,
        canViewAnalytics: false,
        canAccessAdminDashboard: false,
        canAccessCustomerDashboard: false,
        isLoading: true
      }
    }
    
    if (!session?.user?.roles) {
      return {
        canViewUsers: false,
        canManageUsers: false,
        canViewRoles: false,
        canManageRoles: false,
        canViewAnalytics: false,
        canAccessAdminDashboard: false,
        canAccessCustomerDashboard: false,
        isLoading: false
      }
    }
    
    const userRoles = session.user.roles
    
    return {
      canViewUsers: PermissionUtils.canViewUsers(userRoles),
      canManageUsers: PermissionUtils.canManageUsers(userRoles),
      canViewRoles: PermissionUtils.canManageRoles(userRoles),
      canManageRoles: PermissionUtils.canManageRoles(userRoles),
      canViewAnalytics: PermissionUtils.canViewAnalytics(userRoles),
      canAccessAdminDashboard: PermissionUtils.canAccessAdminDashboard(userRoles),
      canAccessCustomerDashboard: PermissionUtils.canAccessCustomerDashboard(userRoles),
      isLoading: false
    }
  }, [session, status])
  
  return result
}

/**
 * Hook to get dashboard path for current user
 */
export function useDashboardPath() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { dashboardPath: null, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { dashboardPath: null, isLoading: false }
    }
    
    const dashboardPath = PermissionUtils.getDashboardPath(session.user.roles)
    
    return { dashboardPath, isLoading: false }
  }, [session, status])
  
  return result
}