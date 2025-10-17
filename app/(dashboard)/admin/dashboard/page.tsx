import { DashboardLayout } from "@/components/layouts/dashboard-layout"
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
  AlertTriangle
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <DashboardLayout>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickAction
                title="Manage Users"
                description="View and manage user accounts"
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
      </div>
    </DashboardLayout>
  )
}

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
        <div className={`w-2 h-2 rounded-full ${
          status === 'healthy' ? 'bg-green-500' : 
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
}

function QuickAction({ title, description, icon, href }: QuickActionProps) {
  return (
    <a
      href={href}
      className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  )
}