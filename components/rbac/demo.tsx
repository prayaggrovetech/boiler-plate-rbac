"use client"

import React from "react"
import {
  useHasPermission,
  useHasRole,
  useCurrentUser,
  useUserManagementPermissions,
  PermissionGate,
  ProtectedRoute,
  RoleBasedNavigation,
  UserAvatar
} from "./index"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
  Alert,
  AlertDescription
} from "@/components/ui"
import { PERMISSIONS, ROLES } from "@/lib/rbac/types"

/**
 * Demo component showcasing all RBAC features
 */
export function RBACDemo() {
  const { user, roleNames, permissions, isAuthenticated } = useCurrentUser()
  const { hasPermission: canViewUsers } = useHasPermission(PERMISSIONS.VIEW_USERS)
  const { hasRole: isAdmin } = useHasRole(ROLES.ADMIN)
  const {
    canManageUsers,
    canViewAnalytics,
    canAccessAdminDashboard
  } = useUserManagementPermissions()
  
  if (!isAuthenticated) {
    return (
      <Alert>
        <AlertDescription>
          Please sign in to see the RBAC demo features.
        </AlertDescription>
      </Alert>
    )
  }
  
  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">RBAC System Demo</h1>
        <p className="text-muted-foreground">
          Demonstration of Role-Based Access Control components and hooks.
        </p>
      </div>
      
      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle>Current User Information</CardTitle>
          <CardDescription>Your roles, permissions, and access levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{user?.name || "Unknown User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <UserAvatar showRoles showPermissions />
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Your Roles</h4>
            <div className="flex flex-wrap gap-2">
              {roleNames.map((role) => (
                <Badge key={role} variant="secondary">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Your Permissions ({permissions.length})</h4>
            <div className="max-h-32 overflow-y-auto">
              <div className="flex flex-wrap gap-1">
                {permissions.slice(0, 15).map((permission) => (
                  <Badge key={permission} variant="outline" className="text-xs">
                    {permission}
                  </Badge>
                ))}
                {permissions.length > 15 && (
                  <Badge variant="outline" className="text-xs">
                    +{permissions.length - 15} more
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Permission Gates Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Gates</CardTitle>
          <CardDescription>Components that show/hide based on permissions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <PermissionGate permission={PERMISSIONS.VIEW_USERS}>
            <Alert>
              <AlertDescription>
                ✅ You can see this because you have the "view:users" permission.
              </AlertDescription>
            </Alert>
          </PermissionGate>
          
          <PermissionGate 
            permission={PERMISSIONS.MANAGE_USERS}
            fallback={
              <Alert variant="warning">
                <AlertDescription>
                  ⚠️ You cannot see user management features (missing "manage:users" permission).
                </AlertDescription>
              </Alert>
            }
          >
            <Alert variant="success">
              <AlertDescription>
                ✅ You can see user management features!
              </AlertDescription>
            </Alert>
          </PermissionGate>
          
          <PermissionGate role={ROLES.ADMIN}>
            <Alert variant="success">
              <AlertDescription>
                👑 Admin-only content is visible to you!
              </AlertDescription>
            </Alert>
          </PermissionGate>
          
          <PermissionGate 
            roles={[ROLES.ADMIN, ROLES.MANAGER]}
            fallback={
              <Alert>
                <AlertDescription>
                  This content is only visible to Admins and Managers.
                </AlertDescription>
              </Alert>
            }
          >
            <Alert variant="success">
              <AlertDescription>
                ✅ Management-level content is visible!
              </AlertDescription>
            </Alert>
          </PermissionGate>
        </CardContent>
      </Card>
      
      {/* Hook Results Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Hooks Results</CardTitle>
          <CardDescription>Real-time permission checking results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Permission Checks</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Can View Users:</span>
                  <Badge variant={canViewUsers ? "success" : "destructive"}>
                    {canViewUsers ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Can Manage Users:</span>
                  <Badge variant={canManageUsers ? "success" : "destructive"}>
                    {canManageUsers ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Can View Analytics:</span>
                  <Badge variant={canViewAnalytics ? "success" : "destructive"}>
                    {canViewAnalytics ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Role Checks</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Is Admin:</span>
                  <Badge variant={isAdmin ? "success" : "destructive"}>
                    {isAdmin ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Can Access Admin Dashboard:</span>
                  <Badge variant={canAccessAdminDashboard ? "success" : "destructive"}>
                    {canAccessAdminDashboard ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Navigation</CardTitle>
          <CardDescription>Navigation items filtered by your permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleBasedNavigation className="border rounded-lg p-4" />
        </CardContent>
      </Card>
      
      {/* Protected Content Demo */}
      <ProtectedRoute permission={PERMISSIONS.VIEW_ANALYTICS}>
        <Card>
          <CardHeader>
            <CardTitle>Protected Content</CardTitle>
            <CardDescription>This card is only visible if you have analytics permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>🎉 Congratulations! You have access to analytics data.</p>
          </CardContent>
        </Card>
      </ProtectedRoute>
    </div>
  )
}