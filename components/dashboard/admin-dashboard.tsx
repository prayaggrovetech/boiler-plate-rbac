"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Shield,
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  UserCheck,
  AlertTriangle,
  Plus
} from "lucide-react"
import { Button } from "../ui"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of system metrics and administrative controls
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
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
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
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
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600"
  }[changeType]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm ${changeColor}`}>
              {change} from last month
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            {icon}
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