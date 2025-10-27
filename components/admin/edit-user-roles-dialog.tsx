"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Role {
  id: string
  name: string
  description: string | null
}

interface User {
  id: string
  email: string
  name: string | null
  roles: Role[]
}

interface EditUserRolesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  roles: Role[]
  onRolesUpdated: (user: User) => void
}

export function EditUserRolesDialog({ 
  open, 
  onOpenChange, 
  user, 
  roles, 
  onRolesUpdated 
}: EditUserRolesDialogProps) {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      setSelectedRoleIds(user.roles.map(role => role.id))
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/users/${user.id}/roles`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roleIds: selectedRoleIds
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update user roles")
      }

      const data = await response.json()
      onRolesUpdated(data.user)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user roles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoleIds(prev => 
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    )
  }

  const currentRoleNames = user.roles.map(role => role.name)
  const selectedRoles = roles.filter(role => selectedRoleIds.includes(role.id))
  const hasChanges = JSON.stringify(selectedRoleIds.sort()) !== JSON.stringify(user.roles.map(r => r.id).sort())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User Roles</DialogTitle>
          <DialogDescription>
            Manage role assignments for {user.name || user.email}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Roles */}
          <div className="space-y-2">
            <Label>Current Roles</Label>
            <div className="flex flex-wrap gap-2">
              {user.roles.length > 0 ? (
                user.roles.map((role) => (
                  <Badge key={role.id} variant="secondary">
                    {role.name}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline">No roles assigned</Badge>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <Label>Available Roles</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={role.id}
                      checked={selectedRoleIds.includes(role.id)}
                      onCheckedChange={() => handleRoleToggle(role.id)}
                    />
                    <Label htmlFor={role.id} className="text-sm font-normal flex-1">
                      <div>
                        <span className="font-medium">{role.name}</span>
                        {role.description && (
                          <p className="text-gray-500 text-xs">{role.description}</p>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview of changes */}
            {hasChanges && (
              <div className="space-y-2 p-3 bg-blue-50 rounded-lg">
                <Label className="text-sm font-medium">New Role Assignment</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedRoles.length > 0 ? (
                    selectedRoles.map((role) => (
                      <Badge key={role.id} variant="default">
                        {role.name}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline">No roles (user will have limited access)</Badge>
                  )}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !hasChanges}
              >
                {loading ? "Updating..." : "Update Roles"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}