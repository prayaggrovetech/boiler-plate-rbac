"use client"

import React from "react"
import { useHasPermission, useHasAnyPermission, useHasAllPermissions } from "./hooks/use-permission"
import { useHasRole, useHasAnyRole } from "./hooks/use-role"
import { Spinner } from "@/components/ui/spinner"

export interface PermissionGateProps {
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  role?: string
  roles?: string[]
  fallback?: React.ReactNode
  loading?: React.ReactNode
  children: React.ReactNode
}

/**
 * Component that conditionally renders children based on user permissions or roles
 */
export function PermissionGate({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  fallback = null,
  loading = <Spinner size="sm" />,
  children
}: PermissionGateProps) {
  // Permission-based checks
  const singlePermissionCheck = useHasPermission(permission || "")
  const anyPermissionCheck = useHasAnyPermission(permissions || [])
  const allPermissionCheck = useHasAllPermissions(permissions || [])
  
  // Role-based checks
  const singleRoleCheck = useHasRole(role || "")
  const anyRoleCheck = useHasAnyRole(roles || [])
  
  // Determine which check to use
  let hasAccess = false
  let isLoading = false
  
  if (permission) {
    hasAccess = singlePermissionCheck.hasPermission
    isLoading = singlePermissionCheck.isLoading
  } else if (permissions && permissions.length > 0) {
    if (requireAll) {
      hasAccess = allPermissionCheck.hasPermission
      isLoading = allPermissionCheck.isLoading
    } else {
      hasAccess = anyPermissionCheck.hasPermission
      isLoading = anyPermissionCheck.isLoading
    }
  } else if (role) {
    hasAccess = singleRoleCheck.hasRole
    isLoading = singleRoleCheck.isLoading
  } else if (roles && roles.length > 0) {
    hasAccess = anyRoleCheck.hasRole
    isLoading = anyRoleCheck.isLoading
  }
  
  if (isLoading) {
    return <>{loading}</>
  }
  
  return hasAccess ? <>{children}</> : <>{fallback}</>
}