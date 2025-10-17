"use client"

import React from "react"
import { useSession, signOut } from "next-auth/react"
import { useCurrentUser } from "./hooks/use-user"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button
} from "@/components/ui"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalDescription
} from "@/components/ui/modal"
import { LogOut, User, Settings } from "lucide-react"
import Link from "next/link"

export interface UserAvatarProps {
  showRoles?: boolean
  showPermissions?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Component that displays user avatar with role information and actions
 */
export function UserAvatar({
  showRoles = true,
  showPermissions = false,
  size = "md",
  className
}: UserAvatarProps) {
  const { data: session } = useSession()
  const { user, roleNames, permissions, isLoading } = useCurrentUser()
  
  if (isLoading || !user) {
    return (
      <Avatar className={className}>
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    )
  }
  
  const avatarSize = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  }[size]
  
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || '?'
  
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className={`${className} focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full`}>
          <Avatar className={avatarSize}>
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </ModalTrigger>
      
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>User Profile</ModalTitle>
          <ModalDescription>
            Your account information and permissions
          </ModalDescription>
        </ModalHeader>
        
        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name || "Unknown User"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          {/* Roles */}
          {showRoles && roleNames.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Roles</h4>
              <div className="flex flex-wrap gap-2">
                {roleNames.map((roleName) => (
                  <Badge key={roleName} variant="secondary">
                    {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Permissions */}
          {showPermissions && permissions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Permissions</h4>
              <div className="max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-1">
                  {permissions.slice(0, 10).map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {permissions.length > 10 && (
                    <Badge variant="outline" className="text-xs">
                      +{permissions.length - 10} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>
            
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}