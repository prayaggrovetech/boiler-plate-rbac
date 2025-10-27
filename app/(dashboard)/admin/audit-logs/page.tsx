import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Filter, Download, User, Shield, Settings, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Audit Logs",
  description: "System audit logs and security events for administrators.",
}

export default function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-2">
            Track system events, user actions, and security incidents.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search audit logs..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value="15,234"
          subtitle="Last 30 days"
          icon={<FileText className="h-5 w-5" />}
          color="blue"
        />
        <StatCard
          title="Security Events"
          value="23"
          subtitle="Requires attention"
          icon={<AlertTriangle className="h-5 w-5" />}
          color="red"
        />
        <StatCard
          title="User Actions"
          value="12,891"
          subtitle="Normal activity"
          icon={<User className="h-5 w-5" />}
          color="green"
        />
        <StatCard
          title="System Changes"
          value="320"
          subtitle="Admin actions"
          icon={<Settings className="h-5 w-5" />}
          color="purple"
        />
      </div>

      {/* Audit Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system events and user actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AuditLogEntry
              timestamp="2024-01-15 14:30:25"
              event="User Login"
              user="john.doe@example.com"
              details="Successful login from IP 192.168.1.100"
              severity="info"
              category="authentication"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:28:12"
              event="Role Assignment"
              user="admin@example.com"
              details="Assigned 'manager' role to user sarah.smith@example.com"
              severity="info"
              category="user_management"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:25:45"
              event="Failed Login Attempt"
              user="unknown@example.com"
              details="Multiple failed login attempts from IP 203.0.113.45"
              severity="warning"
              category="security"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:22:18"
              event="System Configuration"
              user="admin@example.com"
              details="Updated system settings: email notifications enabled"
              severity="info"
              category="system"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:20:33"
              event="Data Export"
              user="manager@example.com"
              details="Exported user data report (users_2024_01.csv)"
              severity="info"
              category="data"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:18:07"
              event="Permission Denied"
              user="user@example.com"
              details="Attempted to access admin panel without permissions"
              severity="warning"
              category="security"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:15:52"
              event="Password Reset"
              user="jane.doe@example.com"
              details="Password reset requested and completed"
              severity="info"
              category="authentication"
            />
            <AuditLogEntry
              timestamp="2024-01-15 14:12:29"
              event="API Key Generated"
              user="developer@example.com"
              details="Generated new API key for production environment"
              severity="info"
              category="api"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing 1-8 of 15,234 entries
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  color: "blue" | "red" | "green" | "purple"
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    red: "text-red-600 bg-red-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100"
  }[color]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface AuditLogEntryProps {
  timestamp: string
  event: string
  user: string
  details: string
  severity: "info" | "warning" | "error"
  category: string
}

function AuditLogEntry({ timestamp, event, user, details, severity, category }: AuditLogEntryProps) {
  const severityColor = {
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800"
  }[severity]

  const categoryIcon = {
    authentication: <User className="h-4 w-4" />,
    user_management: <User className="h-4 w-4" />,
    security: <Shield className="h-4 w-4" />,
    system: <Settings className="h-4 w-4" />,
    data: <FileText className="h-4 w-4" />,
    api: <Settings className="h-4 w-4" />
  }[category] || <FileText className="h-4 w-4" />

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
      <div className="text-gray-400 mt-1">
        {categoryIcon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-gray-900">{event}</h4>
          <Badge className={`text-xs ${severityColor}`}>
            {severity}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-1">{details}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>User: {user}</span>
          <span>Time: {timestamp}</span>
          <span>Category: {category}</span>
        </div>
      </div>
    </div>
  )
}