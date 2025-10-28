"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  UserCheck,
  AlertTriangle,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminDashboard() {
  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Complete system oversight and administrative controls
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Users"
          value="1,234"
          change="+12%"
          changeType="positive"
          icon={<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
        />
        <StatsCard
          title="Active Sessions"
          value="89"
          change="+5%"
          changeType="positive"
          icon={<Activity className="h-5 w-5 text-green-600 dark:text-green-400" />}
        />
        <StatsCard
          title="System Health"
          value="99.9%"
          change="0%"
          changeType="neutral"
          icon={<BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
        />
        <StatsCard
          title="Security Alerts"
          value="3"
          change="-2"
          changeType="positive"
          icon={<AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                action="New user registered"
                user="john.doe@example.com"
                time="2 minutes ago"
                type="user"
              />
              <ActivityItem
                action="Role permissions updated"
                user="admin@example.com"
                time="15 minutes ago"
                type="security"
              />
              <ActivityItem
                action="System backup completed"
                user="System"
                time="1 hour ago"
                type="system"
              />
              <ActivityItem
                action="Failed login attempt"
                user="unknown@example.com"
                time="2 hours ago"
                type="security"
              />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5 text-green-600 dark:text-green-400" />
              System Status
            </CardTitle>
            <CardDescription>Current system health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StatusItem
                service="Database"
                status="healthy"
                uptime="99.9%"
              />
              <StatusItem
                service="Authentication"
                status="healthy"
                uptime="100%"
              />
              <StatusItem
                service="File Storage"
                status="healthy"
                uptime="99.8%"
              />
              <StatusItem
                service="Email Service"
                status="warning"
                uptime="98.5%"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAction
              title="Manage Users"
              description="View and manage all user accounts"
              icon={<Users className="h-5 w-5" />}
              href="/admin/users"
            />
            <QuickAction
              title="Role Management"
              description="Configure roles and permissions"
              icon={<Shield className="h-5 w-5" />}
              href="/admin/roles"
            />
            <QuickAction
              title="Analytics"
              description="View system analytics"
              icon={<BarChart3 className="h-5 w-5" />}
              href="/admin/analytics"
            />
            <QuickAction
              title="System Settings"
              description="Configure system preferences"
              icon={<Settings className="h-5 w-5" />}
              href="/admin/settings"
            />
          </div>
        </CardContent>
      </Card>

      {/* Admin User Creation Guide */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
            <UserCheck className="h-5 w-5" />
            Creating Admin Users
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-400">
            Step-by-step guide to create admin users with proper roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Quick Steps:</h4>
                <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">1</span>
                    <span>Go to <strong>User Management</strong> page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">2</span>
                    <span>Click <strong>"Create User"</strong> button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">3</span>
                    <span>Fill in user details (email, name, password)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">4</span>
                    <span>Select <strong>"admin"</strong> role for full access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-200 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0">5</span>
                    <span>Click <strong>"Create User"</strong> to complete</span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Available Roles:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg border border-border">
                    <div>
                      <span className="font-medium text-foreground">Admin</span>
                      <p className="text-xs text-muted-foreground">Full system access</p>
                    </div>
                    <Badge className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">High Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg border border-border">
                    <div>
                      <span className="font-medium text-foreground">Manager</span>
                      <p className="text-xs text-muted-foreground">Team management access</p>
                    </div>
                    <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400">Medium Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg border border-border">
                    <div>
                      <span className="font-medium text-foreground">Customer</span>
                      <p className="text-xs text-muted-foreground">Basic user access</p>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Basic Access</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-blue-200 dark:border-blue-800">
              <a href="/admin/users">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Admin User Now
                </Button>
              </a>
              <a href="/admin/roles">
                <Button variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  <Shield className="h-4 w-4 mr-2" />
                  Manage Roles & Permissions
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper components (same as before but extracted for reuse)
interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
}

function StatsCard({ title, value, change, changeType, icon }: StatsCardProps) {
  const changeColor = {
    positive: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
    negative: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
    neutral: "text-muted-foreground bg-muted"
  }[changeType]

  const iconBgColor = {
    positive: "bg-green-100 dark:bg-green-900/30",
    negative: "bg-red-100 dark:bg-red-900/30",
    neutral: "bg-muted"
  }[changeType]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-lg ${iconBgColor}`}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${changeColor}`}>
            {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
            {changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
            {changeType === 'neutral' && <Minus className="h-3 w-3" />}
            <span>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  action: string
  user: string
  time: string
  type: "user" | "security" | "system"
}

function ActivityItem({ action, user, time, type }: ActivityItemProps) {
  const typeColors = {
    user: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
    security: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
    system: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{action}</p>
        <p className="text-xs text-muted-foreground">{user}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-xs ${typeColors[type]}`}>
          {type}
        </Badge>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}

interface StatusItemProps {
  service: string
  status: "healthy" | "warning" | "error"
  uptime: string
}

function StatusItem({ service, status, uptime }: StatusItemProps) {
  const statusColors = {
    healthy: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    error: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-green-500' :
          status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
        <span className="text-sm font-medium text-foreground">{service}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-xs ${statusColors[status]}`}>
          {status}
        </Badge>
        <span className="text-xs text-muted-foreground">{uptime}</span>
      </div>
    </div>
  )
}

interface QuickActionProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  highlight?: boolean
}

function QuickAction({ title, description, icon, href, highlight = false }: QuickActionProps) {
  return (
    <a
      href={href}
      className="block group"
    >
      <Card className="hover:shadow-md transition-all hover:border-blue-300 dark:hover:border-blue-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              {icon}
            </div>
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </a>
  )
}