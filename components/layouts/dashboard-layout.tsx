"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal"
import { RoleBasedNavigation } from "@/components/rbac/role-based-navigation"
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DashboardBreadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

interface DashboardSidebarProps {
  onClose: () => void
}

function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const { data: session } = useSession()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MS</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Micro SaaS</span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User info */}
      {session?.user && (
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback>
                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user.name || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user.email}
              </p>
              {session.user.roles && session.user.roles.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {session.user.roles.slice(0, 2).map((role: any) => (
                    <Badge key={role.id} variant="secondary" className="text-xs">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <RoleBasedNavigation
          className="px-4"
          itemClassName="mb-1"
          showIcons={true}
        />
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DashboardHeaderProps {
  onMenuClick: () => void
}

function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar (placeholder) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            {session?.user && <UserMenu user={session.user} />}
          </div>
        </div>
      </div>
    </header>
  )
}

function DashboardBreadcrumbs() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return { href, label, isLast: index === pathSegments.length - 1 }
  })

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            {breadcrumb.isLast ? (
              <span className="text-gray-900 font-medium">{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

interface UserMenuProps {
  user: any
}

function UserMenu({ user }: UserMenuProps) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>
              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user.name || "User"}
          </span>
        </button>
      </ModalTrigger>

      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>Account Menu</ModalTitle>
        </ModalHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name || "Unknown User"}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              {user.roles && user.roles.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {user.roles.map((role: any) => (
                    <Badge key={role.id} variant="secondary" className="text-xs">
                      {role.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Menu Items */}
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </Button>

            <Separator />

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut({ callbackUrl: "/" })}
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