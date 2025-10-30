import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Server, Database, Wifi, HardDrive, Cpu, MemoryStick, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "System Health",
  description: "Real-time system health monitoring and infrastructure status.",
}

export default function AdminSystemHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Health</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system performance, infrastructure status, and service health.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            View Logs
          </Button>
        </div>
      </div>

      {/* Overall Status */}
      <Card className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-full">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-900 dark:text-green-100">All Systems Operational</h2>
              <p className="text-green-700 dark:text-green-300">All services are running normally with no detected issues.</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm text-green-600 dark:text-green-400">Uptime</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">99.98%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceStatusCard
          name="Web Application"
          status="operational"
          uptime="99.99%"
          responseTime="145ms"
          icon={<Server className="h-6 w-6" />}
        />
        <ServiceStatusCard
          name="API Gateway"
          status="operational"
          uptime="99.97%"
          responseTime="89ms"
          icon={<Wifi className="h-6 w-6" />}
        />
        <ServiceStatusCard
          name="Database"
          status="operational"
          uptime="99.95%"
          responseTime="12ms"
          icon={<Database className="h-6 w-6" />}
        />
        <ServiceStatusCard
          name="File Storage"
          status="operational"
          uptime="99.98%"
          responseTime="234ms"
          icon={<HardDrive className="h-6 w-6" />}
        />
        <ServiceStatusCard
          name="Email Service"
          status="degraded"
          uptime="98.45%"
          responseTime="2.3s"
          icon={<Activity className="h-6 w-6" />}
        />
        <ServiceStatusCard
          name="Background Jobs"
          status="operational"
          uptime="99.92%"
          responseTime="N/A"
          icon={<Clock className="h-6 w-6" />}
        />
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              System Resources
            </CardTitle>
            <CardDescription>
              Real-time resource utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResourceUsage
                label="CPU Usage"
                percentage={34}
                status="good"
                details="4 cores, 2.4 GHz average"
              />
              <ResourceUsage
                label="Memory Usage"
                percentage={67}
                status="warning"
                details="10.7 GB / 16 GB used"
              />
              <ResourceUsage
                label="Disk Usage"
                percentage={45}
                status="good"
                details="225 GB / 500 GB used"
              />
              <ResourceUsage
                label="Network I/O"
                percentage={23}
                status="good"
                details="145 Mbps / 1 Gbps"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <MetricItem
                label="Average Response Time"
                value="145ms"
                target="< 200ms"
                status="good"
              />
              <MetricItem
                label="Error Rate"
                value="0.02%"
                target="< 0.1%"
                status="good"
              />
              <MetricItem
                label="Throughput"
                value="1,234 req/min"
                target="> 1,000 req/min"
                status="good"
              />
              <MetricItem
                label="Active Connections"
                value="456"
                target="< 1,000"
                status="good"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>
            System incidents and maintenance events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <IncidentItem
              title="Scheduled Maintenance"
              description="Database optimization and index rebuilding"
              status="completed"
              timestamp="2024-01-14 02:00 - 02:30 UTC"
              impact="low"
            />
            <IncidentItem
              title="Email Service Degradation"
              description="Temporary delays in email delivery due to provider issues"
              status="resolved"
              timestamp="2024-01-12 14:15 - 16:45 UTC"
              impact="medium"
            />
            <IncidentItem
              title="API Rate Limiting"
              description="Implemented enhanced rate limiting for improved stability"
              status="completed"
              timestamp="2024-01-10 10:00 - 10:15 UTC"
              impact="low"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ServiceStatusCardProps {
  name: string
  status: "operational" | "degraded" | "outage"
  uptime: string
  responseTime: string
  icon: React.ReactNode
}

function ServiceStatusCard({ name, status, uptime, responseTime, icon }: ServiceStatusCardProps) {
  const statusConfig = {
    operational: {
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
      badge: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
      label: "Operational"
    },
    degraded: {
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      badge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
      label: "Degraded"
    },
    outage: {
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-900/30",
      badge: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400",
      label: "Outage"
    }
  }[status]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
            <div className={statusConfig.color}>
              {icon}
            </div>
          </div>
          <Badge className={statusConfig.badge}>
            {statusConfig.label}
          </Badge>
        </div>
        <h3 className="font-semibold text-foreground mb-2">{name}</h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Uptime:</span>
            <span className="font-medium">{uptime}</span>
          </div>
          <div className="flex justify-between">
            <span>Response:</span>
            <span className="font-medium">{responseTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ResourceUsageProps {
  label: string
  percentage: number
  status: "good" | "warning" | "critical"
  details: string
}

function ResourceUsage({ label, percentage, status, details }: ResourceUsageProps) {
  const statusColor = {
    good: "bg-green-500 dark:bg-green-600",
    warning: "bg-yellow-500 dark:bg-yellow-600",
    critical: "bg-red-500 dark:bg-red-600"
  }[status]

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-1">
        <div 
          className={`h-2 rounded-full ${statusColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-muted-foreground">{details}</p>
    </div>
  )
}

interface MetricItemProps {
  label: string
  value: string
  target: string
  status: "good" | "warning" | "critical"
}

function MetricItem({ label, value, target, status }: MetricItemProps) {
  const statusColor = {
    good: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    critical: "text-red-600 dark:text-red-400"
  }[status]

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">Target: {target}</p>
      </div>
      <div className={`text-right ${statusColor}`}>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  )
}

interface IncidentItemProps {
  title: string
  description: string
  status: "investigating" | "identified" | "monitoring" | "resolved" | "completed"
  timestamp: string
  impact: "low" | "medium" | "high"
}

function IncidentItem({ title, description, status, timestamp, impact }: IncidentItemProps) {
  const statusConfig = {
    investigating: { color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400", label: "Investigating" },
    identified: { color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400", label: "Identified" },
    monitoring: { color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400", label: "Monitoring" },
    resolved: { color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400", label: "Resolved" },
    completed: { color: "bg-muted text-muted-foreground", label: "Completed" }
  }[status]

  const impactColor = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400"
  }[impact]

  return (
    <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <Badge className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{timestamp}</span>
          <span className={`font-medium ${impactColor}`}>
            {impact.toUpperCase()} IMPACT
          </span>
        </div>
      </div>
    </div>
  )
}