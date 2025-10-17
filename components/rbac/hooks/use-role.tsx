"use client"

import { useSession } from "next-auth/react"
import { useMemo } from "react"
import { PermissionChecker } from "@/lib/rbac/permissions"

/**
 * Hook to check if current user has a specific role
 */
export function useHasRole(roleName: string) {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { hasRole: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { hasRole: false, isLoading: false }
    }
    
    const hasRole = PermissionChecker.hasRole(session.user.roles, roleName)
    
    return { hasRole, isLoading: false }
  }, [session, status, roleName])
  
  return result
}

/**
 * Hook to check if current user has any of the specified roles
 */
export function useHasAnyRole(roleNames: string[]) {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { hasRole: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { hasRole: false, isLoading: false }
    }
    
    const hasRole = PermissionChecker.hasAnyRole(session.user.roles, roleNames)
    
    return { hasRole, isLoading: false }
  }, [session, status, roleNames])
  
  return result
}

/**
 * Hook to get all roles for the current user
 */
export function useUserRoles() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { roles: [], roleNames: [], isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { roles: [], roleNames: [], isLoading: false }
    }
    
    const roles = session.user.roles
    const roleNames = PermissionChecker.getUserRoles(session.user.roles)
    
    return { roles, roleNames, isLoading: false }
  }, [session, status])
  
  return result
}

/**
 * Hook to check if current user is admin
 */
export function useIsAdmin() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { isAdmin: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { isAdmin: false, isLoading: false }
    }
    
    const isAdmin = PermissionChecker.isAdmin(session.user.roles)
    
    return { isAdmin, isLoading: false }
  }, [session, status])
  
  return result
}

/**
 * Hook to check if current user is manager or above
 */
export function useIsManagerOrAbove() {
  const { data: session, status } = useSession()
  
  const result = useMemo(() => {
    if (status === "loading") {
      return { isManagerOrAbove: false, isLoading: true }
    }
    
    if (!session?.user?.roles) {
      return { isManagerOrAbove: false, isLoading: false }
    }
    
    const isManagerOrAbove = PermissionChecker.isManagerOrAbove(session.user.roles)
    
    return { isManagerOrAbove, isLoading: false }
  }, [session, status])
  
  return result
}