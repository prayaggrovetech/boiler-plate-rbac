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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-blue-100 text-lg">
                Complete system oversight and administrative controls
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-100">System Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-200" />
                  <span className="text-sm text-blue-100">1,234 Total Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-200" />
                  <span className="text-sm text-blue-100">89 Active Sessions</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-white/80" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
        <StatsCard
          title="Total Users"
          value="1,234"
          change="+12%"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatsCard
          title="Active Sessions"
          value="89"
          change="+5%"
          changeType="positive"
          icon={<Activity className="h-6 w-6 text-green-600" />}
        />
        <StatsCard
          title="System Health"
          value="99.9%"
          change="0%"
          changeType="neutral"
          icon={<BarChart3 className="h-6 w-6 text-purple-600" />}
        />
        <StatsCard
          title="Security Alerts"
          value="3"
          change="-2"
          changeType="positive"
          icon={<AlertTriangle className="h-6 w-6 text-orange-600" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4">
        {/* Recent Activity */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-600">Latest system events and user actions</CardDescription>
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
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="h-5 w-5 text-green-600" />
              </div>
              System Status
            </CardTitle>
            <CardDescription className="text-gray-600">Current system health and performance</CardDescription>
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
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
            <QuickAction
              title="Create Admin User"
              description="Add new admin users with full access"
              icon={<UserCheck className="h-6 w-6" />}
              href="/admin/users"
              highlight={true}
            />
            <QuickAction
              title="Manage Users"
              description="View and manage all user accounts"
              icon={<Users className="h-6 w-6" />}
              href="/admin/users"
            />
            <QuickAction
              title="Role Management"
              description="Configure roles and permissions"
              icon={<Shield className="h-6 w-6" />}
              href="/admin/roles"
            />
            <QuickAction
              title="System Settings"
              description="Configure system preferences"
              icon={<Settings className="h-6 w-6" />}
              href="/admin/settings"
            />
          </div>
        </CardContent>
      </Card>

      {/* Admin User Creation Guide */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <UserCheck className="h-5 w-5" />
            Creating Admin Users
          </CardTitle>
          <CardDescription className="text-blue-700">
            Step-by-step guide to create admin users with proper roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Quick Steps:</h4>
                <ol className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
                    <span>Go to <strong>User Management</strong> page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
                    <span>Click <strong>"Create User"</strong> button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                    <span>Fill in user details (email, name, password)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">4</span>
                    <span>Select <strong>"admin"</strong> role for full access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">5</span>
                    <span>Click <strong>"Create User"</strong> to complete</span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Available Roles:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>
                      <span className="font-medium text-blue-900">Admin</span>
                      <p className="text-xs text-blue-700">Full system access</p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">High Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>
                      <span className="font-medium text-blue-900">Manager</span>
                      <p className="text-xs text-blue-700">Team management access</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Medium Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <div>
                      <span className="font-medium text-blue-900">Customer</span>
                      <p className="text-xs text-blue-700">Basic user access</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Basic Access</Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-blue-200">
              <a href="/admin/users">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Admin User Now
                </Button>
              </a>
              <a href="/admin/roles">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
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
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-gray-600 bg-gray-50"
  }[changeType]

  const iconBgColor = {
    positive: "bg-green-100",
    negative: "bg-red-100",
    neutral: "bg-gray-100"
  }[changeType]

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${iconBgColor}`}>
                {icon}
              </div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${changeColor}`}>
                {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
                {changeType === 'negative' && <TrendingDown className="h-3 w-3" />}
                {changeType === 'neutral' && <Minus className="h-3 w-3" />}
                <span>{change} from last month</span>
              </div>
            </div>
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
    user: "bg-blue-100 text-blue-800",
    security: "bg-red-100 text-red-800",
    system: "bg-green-100 text-green-800"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-xs text-gray-500">{user}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-xs ${typeColors[type]}`}>
          {type}
        </Badge>
        <span className="text-xs text-gray-500">{time}</span>
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
    healthy: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-green-500' :
          status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
        <span className="text-sm font-medium text-gray-900">{service}</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`text-xs ${statusColors[status]}`}>
          {status}
        </Badge>
        <span className="text-xs text-gray-500">{uptime}</span>
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
      className={`block p-4 border rounded-lg transition-colors ${highlight
        ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
        : "border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${highlight
          ? "bg-blue-200 text-blue-700"
          : "bg-blue-100 text-blue-600"
          }`}>
          {icon}
        </div>
        <h3 className={`font-semibold ${highlight ? "text-blue-900" : "text-gray-900"
          }`}>{title}</h3>
      </div>
      <p className={`text-sm ${highlight ? "text-blue-700" : "text-gray-600"
        }`}>{description}</p>
    </a>
  )
}