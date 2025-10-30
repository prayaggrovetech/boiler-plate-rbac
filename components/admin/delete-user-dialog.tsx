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
import { AlertTriangle, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  roles: Array<{
    id: string
    name: string
  }>
  isActive: boolean
  createdAt: string
}

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  onUserDeleted: (userId: string) => void
}

export function DeleteUserDialog({ 
  open, 
  onOpenChange, 
  user, 
  onUserDeleted 
}: DeleteUserDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setLoading(true)

    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))

      onUserDeleted(user.id)
      
      toast({
        title: "Success",
        description: "User deleted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const isAdminUser = user.roles.some(role => role.name === 'admin')
  const hasMultipleRoles = user.roles.length > 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
            Delete User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Info */}
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Roles:</span>
                <div className="flex gap-1">
                  {user.roles.map((role) => (
                    <Badge key={role.id} variant="outline" className="text-xs">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={user.isActive ? "default" : "secondary"} className="text-xs">
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Warnings */}
          {isAdminUser && (
            <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Admin User Warning</p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This user has admin privileges. Deleting an admin user may affect system administration capabilities.
                  </p>
                </div>
              </div>
            </div>
          )}

          {user.isActive && (
            <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500 dark:text-orange-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">Active User</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    This user is currently active. Consider deactivating the user first before deletion.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isAdminUser && !user.isActive && (
            <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full mt-0.5"></div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Safe to Delete</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    This inactive user can be safely deleted without affecting system operations.
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
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}