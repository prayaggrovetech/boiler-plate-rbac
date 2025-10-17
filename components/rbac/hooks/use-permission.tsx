"use client"

import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { PermissionChecker } from "@/lib/rbac/permissions"
import { transformDatabaseUser } from "@/lib/rbac/utils"

/**
 * Hook to check if current user has a specific permission
 */
export function useHasPermission(permission: string) {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { hasPermission: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { hasPermission: false, isLoading: false }
    }
    
    const hasPermission = PermissionChecker.hasPermission(session.user.roles, permission)
    
    return { hasPermission, isLoading: false }
  }, [session, status, permission])
  
  return result
}

/**
 * Hook to check if current user has any of the specified permissions
 */
export function useHasAnyPermission(permissions: string[]) {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { hasPermission: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { hasPermission: false, isLoading: false }
    }
    
    const hasPermission = PermissionChecker.hasAnyPermission(session.user.roles, permissions)
    
    return { hasPermission, isLoading: false }
  }, [session, status, permissions])
  
  return result
}

/**
 * Hook to check if current user has all of the specified permissions
 */
export function useHasAllPermissions(permissions: string[]) {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { hasPermission: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { hasPermission: false, isLoading: false }
    }
    
    const hasPermission = PermissionChecker.hasAllPermissions(session.user.roles, permissions)
    
    return { hasPermission, isLoading: false }
  }, [session, status, permissions])
  
  return result
}

/**
 * Hook to get all permissions for the current user
 */
export function useUserPermissions() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { permissions: [], isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { permissions: [], isLoading: false }
    }
    
    const permissions = PermissionChecker.getUserPermissions(session.user.roles)
    
    return { permissions, isLoading: false }
  }, [session, status])
  
  return result
}