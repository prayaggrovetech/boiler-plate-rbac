"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { PermissionGate } from "./permission-gate"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface ProtectedRouteProps {
  permission?: string
  permissions?: string[]
  requireAll?: boolean
  role?: string
  roles?: string[]
  redirectTo?: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

/**
 * Component that protects routes based on authentication and permissions
 */
export function ProtectedRoute({
  permission,
  permissions,
  requireAll = false,
  role,
  roles,
  redirectTo,
  fallback,
  children
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === "loading") return
    
    if (!session && redirectTo) {
      router.push(redirectTo)
    }
  }, [session, status, redirectTo, router])
  
  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    )
  }
  
  // Show login prompt if not authenticated
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Alert>
            <AlertDescription>
              You need to be logged in to access this page.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  // Use PermissionGate for permission/role checking
  return (
    <PermissionGate
      permission={permission}
      permissions={permissions}
      requireAll={requireAll}
      role={role}
      roles={roles}
      fallback={
        fallback || (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <Alert variant="destructive">
                <AlertDescription>
                  You don't have permission to access this page.
                </AlertDescription>
              </Alert>
              <Button variant="outline" asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        )
      }
    >
      {children}
    </PermissionGate>
  )
}