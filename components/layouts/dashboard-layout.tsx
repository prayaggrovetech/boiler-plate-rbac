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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  ChevronRight,
  PanelLeftClose,
  PanelLeft
} from "lucide-react"
import { ThemeToggle } from "@/components/theme"
import { cn } from "@/lib/utils"
import { useSidebarState } from "./hooks/use-sidebar-state"
import { useKeyboardNavigation } from "./hooks/use-keyboard-navigation"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { collapsed: sidebarCollapsed, toggleCollapsed } = useSidebarState(false)

  // Handle keyboard navigation (Escape to close mobile sidebar)
  useKeyboardNavigation({
    onEscape: () => {
      if (sidebarOpen) {
        setSidebarOpen(false)
      }
    },
    enabled: sidebarOpen
  })

  return (
    <div className="min-h-screen bg-background flex w-full overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 bg-card border-r shadow-sm transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        "w-64" // Mobile width
      )}>
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 w-full min-w-0 transition-all duration-300 ease-in-out">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <DashboardBreadcrumbs />
            <div className="w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface DashboardSidebarProps {
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

function DashboardSidebar({ onClose, collapsed, onToggleCollapse }: DashboardSidebarProps) {
  const { data: session } = useSession()

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center border-b transition-all duration-300",
        collapsed ? "justify-center px-3" : "justify-between px-6"
      )}>
        <Link href="/" className={cn(
          "flex items-center transition-all duration-200 hover:opacity-80",
          collapsed ? "space-x-0" : "space-x-3"
        )}>
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">MS</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-xl text-foreground whitespace-nowrap">Micro SaaS</span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Collapse toggle button (desktop only) */}
      <div className={cn(
        "hidden lg:flex border-b py-2",
        collapsed ? "justify-center px-2" : "justify-end px-4"
      )}>
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-150 hover:scale-105 active:scale-95"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <PanelLeftClose className="h-4 w-4 transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* User info */}
      {session?.user && (
        <div className={cn(
          "border-b transition-all duration-300",
          collapsed ? "p-2" : "p-4"
        )}>
          {collapsed ? (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="flex justify-center cursor-pointer hover:opacity-80 transition-opacity duration-150">
                    <Avatar className="h-8 w-8 ring-2 ring-border">
                      <AvatarImage src={session.user.image || undefined} />
                      <AvatarFallback className="text-xs font-semibold">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="p-3">
                  <div className="text-sm space-y-1">
                    <p className="font-semibold">{session.user.name || "Unknown User"}</p>
                    <p className="text-muted-foreground text-xs">{session.user.email}</p>
                    {session.user.roles && session.user.roles.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {session.user.roles.slice(0, 2).map((role: any) => (
                          <Badge key={role.id} variant="secondary" className="text-xs">
                            {role.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors duration-150 cursor-pointer">
              <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-border">
                <AvatarImage src={session.user.image || undefined} />
                <AvatarFallback className="text-sm font-semibold">
                  {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {session.user.name || "Unknown User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {session.user.email}
                </p>
                {session.user.roles && session.user.roles.length > 0 && (
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {session.user.roles.slice(0, 2).map((role: any) => (
                      <Badge key={role.id} variant="secondary" className="text-xs px-2 py-0">
                        {role.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 relative overflow-hidden">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent pointer-events-none z-10" />
        
        <nav 
          className="h-full overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
          aria-label="Main navigation"
        >
          <RoleBasedNavigation
            className={collapsed ? "space-y-1" : "space-y-1 px-2"}
            itemClassName=""
            showIcons={true}
            collapsed={collapsed}
          />
        </nav>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
      </div>

      {/* Footer */}
      <div className={cn(
        "border-t transition-all duration-300",
        collapsed ? "p-2" : "p-4"
      )}>
        <div className="space-y-1">
          {collapsed ? (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center p-2 hover:bg-accent transition-all duration-150 hover:scale-105 active:scale-95"
                    asChild
                  >
                    <Link href="/settings" aria-label="Settings">
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-150 hover:scale-105 active:scale-95"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    aria-label="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Sign Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-accent transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]" 
                asChild
              >
                <Link href="/settings">
                  <Settings className="h-4 w-4 mr-3" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span className="text-sm font-medium">Sign Out</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface DashboardHeaderProps {
  onMenuClick: () => void
  sidebarCollapsed: boolean
}

function DashboardHeader({ onMenuClick, sidebarCollapsed }: DashboardHeaderProps) {
  const { data: session } = useSession()

  return (
    <header className="bg-card shadow-sm border-b">
      <div className="w-full px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search bar (placeholder) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[400px] overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-muted-foreground">John Doe just signed up</p>
                        <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System update completed</p>
                        <p className="text-xs text-muted-foreground">All services are running normally</p>
                        <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">High CPU usage detected</p>
                        <p className="text-xs text-muted-foreground">Server load at 85%</p>
                        <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center cursor-pointer">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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

  // Skip role-based prefixes (admin, customer, manager) and dashboard
  const rolePrefixes = ['admin', 'customer', 'manager']
  const filteredSegments = pathSegments.filter(segment =>
    !rolePrefixes.includes(segment.toLowerCase()) && segment.toLowerCase() !== 'dashboard'
  )

  // If we're on a role dashboard (e.g., /admin/dashboard), show just "Dashboard"
  if (pathSegments.includes('dashboard') && filteredSegments.length === 0) {
    return (
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
            <span className="text-foreground font-medium">Dashboard</span>
          </li>
        </ol>
      </nav>
    )
  }

  // Build breadcrumbs from filtered segments
  const breadcrumbs = filteredSegments.map((segment, index) => {
    // Reconstruct the full path including the role prefix
    const fullPath = '/' + pathSegments.slice(0, pathSegments.indexOf(segment) + 1).join('/')

    // Format label: replace hyphens with spaces and capitalize
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      href: fullPath,
      label,
      isLast: index === filteredSegments.length - 1
    }
  })

  if (breadcrumbs.length === 0) return null

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
            {breadcrumb.isLast ? (
              <span className="text-foreground font-medium">{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-muted-foreground hover:text-foreground"
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
  const [open, setOpen] = React.useState(false)

  // Determine the role prefix for navigation
  const getRolePrefix = () => {
    if (!user.roles || user.roles.length === 0) return 'customer'

    const roleNames = user.roles.map((role: any) => role.name.toLowerCase())

    // Priority: admin > manager > customer
    if (roleNames.includes('admin')) return 'admin'
    if (roleNames.includes('manager')) return 'manager'
    return 'customer'
  }

  const rolePrefix = getRolePrefix()
  const profilePath = `/${rolePrefix}/profile`
  const settingsPath = '/settings' // Settings is now universal

  const handleNavigation = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback>
              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block text-sm font-medium text-foreground">
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
          <div className="flex items-center space-x-4 p-4 bg-accent rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{user.name || "Unknown User"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start" 
              asChild
              onClick={handleNavigation}
            >
              <Link href={profilePath}>
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start" 
              asChild
              onClick={handleNavigation}
            >
              <Link href={settingsPath}>
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </Button>

            <Separator />

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => {
                setOpen(false)
                signOut({ callbackUrl: "/" })
              }}
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