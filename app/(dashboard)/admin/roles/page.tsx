"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Shield, 
  Plus, 
  Edit,
  Trash2,
  Users,
  Key
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { CreateRoleDialog } from "@/components/admin/create-role-dialog"
import { EditRoleDialog } from "@/components/admin/edit-role-dialog"
import { DeleteRoleDialog } from "@/components/admin/delete-role-dialog"

interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description: string | null
}

interface Role {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  permissions: Permission[]
  users: Array<{
    id: string
    name: string | null
    email: string
  }>
  userCount: number
}

export default function RolesManagement() {
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles")
      if (!response.ok) throw new Error("Failed to fetch roles")
      
      const data = await response.json()
      setRoles(data.roles)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await fetch("/api/permissions")
      if (!response.ok) throw new Error("Failed to fetch permissions")
      
      const data = await response.json()
      setPermissions(data.permissions)
    } catch (error) {
      console.error("Failed to fetch permissions:", error)
    }
  }

  const handleRoleCreated = (newRole: Role) => {
    setRoles(prev => [...prev, newRole])
    setCreateDialogOpen(false)
    toast({
      title: "Success",
      description: "Role created successfully"
    })
  }

  const handleRoleUpdated = (updatedRole: Role) => {
    setRoles(prev => prev.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ))
    setEditDialogOpen(false)
    setSelectedRole(null)
    toast({
      title: "Success",
      description: "Role updated successfully"
    })
  }

  const handleRoleDeleted = (deletedRoleId: string) => {
    setRoles(prev => prev.filter(role => role.id !== deletedRoleId))
    setDeleteDialogOpen(false)
    setSelectedRole(null)
    toast({
      title: "Success",
      description: "Role deleted successfully"
    })
  }

  const openEditDialog = (role: Role) => {
    setSelectedRole(role)
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role)
    setDeleteDialogOpen(true)
  }

  const getPermissionsByResource = (permissions: Permission[]) => {
    const grouped = permissions.reduce((acc, permission) => {
      if (!acc[permission.resource]) {
        acc[permission.resource] = []
      }
      acc[permission.resource].push(permission)
      return acc
    }, {} as Record<string, Permission[]>)

    return Object.entries(grouped).map(([resource, perms]) => ({
      resource,
      permissions: perms
    }))
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading roles...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
            <p className="text-gray-600 mt-2">
              Manage roles and their permissions
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles ({roles.length})
            </CardTitle>
            <CardDescription>
              Manage system roles and their permission assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <Shield className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">{role.name}</p>
                            <p className="text-sm text-gray-500">{role.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {role.description || "No description"}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getPermissionsByResource(role.permissions).map(({ resource, permissions }) => (
                            <div key={resource} className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {resource}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {permissions.length} permissions
                              </span>
                            </div>
                          ))}
                          {role.permissions.length === 0 && (
                            <Badge variant="secondary">No permissions</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{role.userCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(role.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(role)}
                            disabled={['admin', 'customer', 'manager'].includes(role.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Permissions Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Available Permissions ({permissions.length})
            </CardTitle>
            <CardDescription>
              System permissions that can be assigned to roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getPermissionsByResource(permissions).map(({ resource, permissions: resourcePermissions }) => (
                <div key={resource} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2 capitalize">{resource}</h4>
                  <div className="space-y-1">
                    {resourcePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between">
                        <span className="text-sm">{permission.action}</span>
                        <Badge variant="outline" className="text-xs">
                          {permission.name}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Role Dialog */}
        <CreateRoleDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onRoleCreated={handleRoleCreated}
          permissions={permissions}
        />

        {/* Edit Role Dialog */}
        {selectedRole && (
          <EditRoleDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            role={selectedRole}
            permissions={permissions}
            onRoleUpdated={handleRoleUpdated}
          />
        )}

        {/* Delete Role Dialog */}
        {selectedRole && (
          <DeleteRoleDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            role={selectedRole}
            onRoleDeleted={handleRoleDeleted}
          />
        )}
      </div>
    </DashboardLayout>
  )
}