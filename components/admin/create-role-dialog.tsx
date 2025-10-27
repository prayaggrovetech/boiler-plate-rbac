"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

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
  permissions: Permission[]
}

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRoleCreated: (role: Role) => void
  permissions: Permission[]
}

export function CreateRoleDialog({ 
  open, 
  onOpenChange, 
  onRoleCreated, 
  permissions 
}: CreateRoleDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          permissions: selectedPermissions
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create role")
      }

      const data = await response.json()
      onRoleCreated(data.role)
      
      // Reset form
      setFormData({ name: "", description: "" })
      setSelectedPermissions([])
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create role",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePermissionToggle = (permissionName: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionName)
        ? prev.filter(p => p !== permissionName)
        : [...prev, permissionName]
    )
  }

  const getPermissionsByResource = () => {
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

  const selectedPermissionObjects = permissions.filter(p => selectedPermissions.includes(p.name))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
            Create a new role and assign permissions to it.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., editor, moderator"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this role can do..."
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Assign Permissions</Label>
              <p className="text-sm text-gray-500">
                Select the permissions this role should have
              </p>
            </div>

            <div className="space-y-4">
              {getPermissionsByResource().map(({ resource, permissions: resourcePermissions }) => (
                <div key={resource} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 capitalize flex items-center gap-2">
                    {resource}
                    <Badge variant="outline" className="text-xs">
                      {resourcePermissions.filter(p => selectedPermissions.includes(p.name)).length} / {resourcePermissions.length}
                    </Badge>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {resourcePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={selectedPermissions.includes(permission.name)}
                          onCheckedChange={() => handlePermissionToggle(permission.name)}
                        />
                        <Label htmlFor={permission.id} className="text-sm font-normal flex-1">
                          <div>
                            <span className="font-medium">{permission.action}</span>
                            <span className="text-gray-500 ml-1">({permission.name})</span>
                            {permission.description && (
                              <p className="text-gray-500 text-xs">{permission.description}</p>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedPermissionObjects.length > 0 && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <Label className="text-sm font-medium">Selected Permissions ({selectedPermissionObjects.length})</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedPermissionObjects.map((permission) => (
                    <Badge key={permission.id} variant="secondary" className="text-xs">
                      {permission.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Role"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}