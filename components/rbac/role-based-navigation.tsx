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
  badge?: {
    count?: number
    variant?: 'default' | 'urgent' | 'info'
  }
  section?: string
}

export interface NavigationSectionData {
  id: string
  title?: string
  items: NavigationItem[]
  order: number
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

interface NavigationBadgeProps {
  count?: number
  variant?: 'default' | 'urgent' | 'info'
  collapsed?: boolean
}

function NavigationBadge({ count, variant = 'default', collapsed = false }: NavigationBadgeProps) {
  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    urgent: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  if (!count || count === 0) return null

  return (
    <span
      className={cn(
        "flex items-center justify-center text-xs font-semibold rounded-full min-w-[18px] h-[18px] px-1",
        variantStyles[variant],
        collapsed ? "absolute -top-1 -right-1" : "ml-auto"
      )}
      aria-label={`${count} notifications`}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}

interface NavigationSectionProps {
  title?: string
  items: NavigationItem[]
  collapsed: boolean
  itemClassName?: string
  activeClassName?: string
  showIcons?: boolean
  showDivider?: boolean
}

const NavigationSection = React.memo(function NavigationSection({
  title,
  items,
  collapsed,
  itemClassName,
  activeClassName,
  showIcons,
  showDivider = true
}: NavigationSectionProps) {
  const [visibleCount, setVisibleCount] = React.useState(0)
  const itemsRef = React.useRef<Map<string, boolean>>(new Map())

  // Track visibility of each item
  const updateItemVisibility = React.useCallback((path: string, isVisible: boolean) => {
    itemsRef.current.set(path, isVisible)
    const count = Array.from(itemsRef.current.values()).filter(v => v).length
    setVisibleCount(count)
  }, [])

  if (items.length === 0) return null

  return (
    <div className="space-y-1">
      {title && !collapsed && visibleCount > 0 && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground opacity-60">
            {title}
          </h3>
        </div>
      )}
      <ul className="space-y-1">
        {items.map((item, index) => (
          <NavigationItemWrapper
            key={item.path}
            item={item}
            itemClassName={itemClassName}
            activeClassName={activeClassName}
            showIcons={showIcons}
            collapsed={collapsed}
            index={index}
            onVisibilityChange={updateItemVisibility}
          />
        ))}
      </ul>
      {showDivider && visibleCount > 0 && (
        <div className="py-2">
          <div className="h-px bg-border" />
        </div>
      )}
    </div>
  )
})

// Wrapper to track item visibility
interface NavigationItemWrapperProps extends NavigationItemComponentProps {
  index?: number
  onVisibilityChange: (path: string, isVisible: boolean) => void
}

function NavigationItemWrapper({
  item,
  onVisibilityChange,
  ...props
}: NavigationItemWrapperProps) {
  const { hasPermission, isLoading } = useHasPermission(item.permissions[0] || "")

  React.useEffect(() => {
    const isVisible = !isLoading && (hasPermission || item.permissions.length === 0)
    onVisibilityChange(item.path, isVisible)
  }, [hasPermission, isLoading, item.path, item.permissions.length, onVisibilityChange])

  if (isLoading || (!hasPermission && item.permissions.length > 0)) {
    return null
  }

  return <NavigationItemComponent item={item} {...props} />
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
  // All hooks must be called before any conditional returns
  const pathname = usePathname()
  const { roleNames, isLoading } = useUserRoles()
  
  // Filter navigation items based on user roles
  const visibleItems = React.useMemo(() => {
    if (isLoading) return []
    
    return NAVIGATION_ROUTES.filter(route => {
      if (!route.roles || route.roles.length === 0) {
        return true // No role restriction
      }
      
      return route.roles.some(role => roleNames.includes(role))
    }).map(route => ({
      ...route,
      isActive: pathname === route.path || pathname.startsWith(route.path + '/'),
      isVisible: true
    }))
  }, [roleNames, isLoading, pathname])

  // Group items by section
  const sections = React.useMemo(() => {
    if (isLoading || visibleItems.length === 0) return []
    
    const sectionMap = new Map<string, NavigationItem[]>()
    
    visibleItems.forEach(item => {
      const sectionKey = item.section || 'default'
      if (!sectionMap.has(sectionKey)) {
        sectionMap.set(sectionKey, [])
      }
      sectionMap.get(sectionKey)!.push(item)
    })

    // Import section config
    const { NAVIGATION_SECTIONS } = require('@/lib/rbac/routes')
    
    // Convert to array and sort by order
    return Array.from(sectionMap.entries())
      .map(([key, items]) => ({
        id: key,
        title: NAVIGATION_SECTIONS[key]?.title,
        items,
        order: NAVIGATION_SECTIONS[key]?.order ?? 999
      }))
      .sort((a, b) => a.order - b.order)
  }, [visibleItems, isLoading])
  
  // Now we can do conditional returns after all hooks are called
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
        {sections.map((section, index) => (
          <NavigationSection
            key={section.id}
            title={section.title}
            items={section.items}
            collapsed={collapsed}
            itemClassName={itemClassName}
            activeClassName={activeClassName}
            showIcons={showIcons}
            showDivider={index < sections.length - 1}
          />
        ))}
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

const NavigationItemComponent = React.memo(function NavigationItemComponent({
  item,
  itemClassName,
  activeClassName,
  showIcons,
  collapsed = false,
  index = 0
}: NavigationItemComponentProps & { index?: number }) {
  // All hooks must be called before any conditional returns
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Stagger the entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 50) // 50ms delay per item

    return () => clearTimeout(timer)
  }, [index])
  
  const linkContent = (
    <Link
      href={item.path}
      className={cn(
        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium relative",
        "transition-all duration-200 ease-out",
        "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        collapsed ? "justify-center" : "gap-3",
        item.isActive && (
          activeClassName || "bg-primary/10 text-primary border-l-4 border-primary pl-2.5"
        ),
        !item.isActive && "text-muted-foreground",
        // Entrance animation
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2",
        itemClassName
      )}
      style={{
        transitionDelay: isVisible ? "0ms" : `${index * 50}ms`
      }}
      aria-current={item.isActive ? "page" : undefined}
      aria-label={`Navigate to ${item.title}`}
    >
      {showIcons && item.icon && (
        <div className="relative flex-shrink-0">
          <IconComponent name={item.icon} className="h-4 w-4" />
          {collapsed && item.badge && (
            <NavigationBadge
              count={item.badge.count}
              variant={item.badge.variant}
              collapsed={true}
            />
          )}
        </div>
      )}
      {!collapsed && (
        <>
          <span className="truncate flex-1">{item.title}</span>
          {item.badge && (
            <NavigationBadge
              count={item.badge.count}
              variant={item.badge.variant}
              collapsed={false}
            />
          )}
        </>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <li>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      </li>
    )
  }

  return <li>{linkContent}</li>
})