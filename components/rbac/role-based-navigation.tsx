"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUserRoles } from "./hooks/use-role"
import { useHasPermission } from "./hooks/use-permission"
import { NAVIGATION_ROUTES, type RouteMetadata } from "@/lib/rbac/routes"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  LayoutDashboard, 
  Users, 
  Shield, 
  Settings, 
  User, 
  CreditCard, 
  BarChart3, 
  FileText,
  Activity,
  LucideIcon
} from "lucide-react"

export interface NavigationItem extends RouteMetadata {
  isActive?: boolean
  isVisible?: boolean
}

// Icon mapping for navigation items
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  User,
  CreditCard,
  BarChart3,
  FileText,
  Activity
}

interface IconComponentProps {
  name: string
  className?: string
}

function IconComponent({ name, className }: IconComponentProps) {
  const Icon = iconMap[name]
  if (!Icon) {
    return <LayoutDashboard className={className} />
  }
  return <Icon className={className} />
}

export interface RoleBasedNavigationProps {
  className?: string
  itemClassName?: string
  activeClassName?: string
  renderItem?: (item: NavigationItem) => React.ReactNode
  showIcons?: boolean
  collapsed?: boolean
}

/**
 * Component that renders navigation based on user roles and permissions
 */
export function RoleBasedNavigation({
  className,
  itemClassName,
  activeClassName = "bg-primary/10 text-primary",
  renderItem,
  showIcons = true,
  collapsed = false
}: RoleBasedNavigationProps) {
  const pathname = usePathname()
  const { roleNames, isLoading } = useUserRoles()
  
  if (isLoading) {
    return (
      <nav className={className}>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </nav>
    )
  }
  
  // Filter navigation items based on user roles
  const visibleItems = NAVIGATION_ROUTES.filter(route => {
    if (!route.roles || route.roles.length === 0) {
      return true // No role restriction
    }
    
    return route.roles.some(role => roleNames.includes(role))
  }).map(route => ({
    ...route,
    isActive: pathname === route.path || pathname.startsWith(route.path + '/'),
    isVisible: true
  }))
  
  if (renderItem) {
    return (
      <nav className={className}>
        {visibleItems.map((item) => renderItem(item))}
      </nav>
    )
  }
  
  return (
    <TooltipProvider delayDuration={0}>
      <nav className={className}>
        <ul className="space-y-1">
          {visibleItems.map((item) => (
            <NavigationItemComponent
              key={item.path}
              item={item}
              itemClassName={itemClassName}
              activeClassName={activeClassName}
              showIcons={showIcons}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  )
}

interface NavigationItemComponentProps {
  item: NavigationItem
  itemClassName?: string
  activeClassName?: string
  showIcons?: boolean
  collapsed?: boolean
}

function NavigationItemComponent({
  item,
  itemClassName,
  activeClassName,
  showIcons,
  collapsed = false
}: NavigationItemComponentProps) {
  const { hasPermission, isLoading } = useHasPermission(item.permissions[0] || "")
  
  if (isLoading) {
    return <Skeleton className="h-10 w-full" />
  }
  
  if (!hasPermission && item.permissions.length > 0) {
    return null
  }
  
  const linkContent = (
    <Link
      href={item.path}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center" : "gap-3",
        item.isActive && activeClassName,
        itemClassName
      )}
    >
      {showIcons && item.icon && (
        <IconComponent name={item.icon} className="h-4 w-4 flex-shrink-0" />
      )}
      {!collapsed && <span>{item.title}</span>}
    </Link>
  )

  if (collapsed) {
    return (
      <li>
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </li>
    )
  }

  return <li>{linkContent}</li>
}