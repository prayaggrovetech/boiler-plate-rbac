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
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Role {
  id: string
  name: string
  description: string | null
  userCount: number
}

interface DeleteRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: Role
  onRoleDeleted: (roleId: string) => void
}

export function DeleteRoleDialog({ 
  open, 
  onOpenChange, 
  role, 
  onRoleDeleted 
}: DeleteRoleDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/roles/${role.id}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete role")
      }

      onRoleDeleted(role.id)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete role",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const isSystemRole = ['admin', 'customer', 'manager'].includes(role.name)
  const hasUsers = role.userCount > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Role
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this role? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Role Info */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Role:</span>
                <Badge variant="outline">{role.name}</Badge>
              </div>
              {role.description && (
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium">Assigned Users:</span>
                <Badge variant={hasUsers ? "destructive" : "secondary"}>
                  {role.userCount} users
                </Badge>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {isSystemRole && (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">System Role Warning</p>
                  <p className="text-sm text-red-700">
                    This is a system role that is essential for application functionality. 
                    Deleting it may cause unexpected behavior.
                  </p>
                </div>
              </div>
            </div>
          )}

          {hasUsers && (
            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Users Assigned</p>
                  <p className="text-sm text-orange-700">
                    This role is currently assigned to {role.userCount} user(s). 
                    You must remove all user assignments before deleting this role.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isSystemRole && !hasUsers && (
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full mt-0.5"></div>
                <div>
                  <p className="text-sm font-medium text-green-800">Safe to Delete</p>
                  <p className="text-sm text-green-700">
                    This role has no user assignments and can be safely deleted.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading || isSystemRole || hasUsers}
          >
            {loading ? "Deleting..." : "Delete Role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}