"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Activity,
  UserCheck,
  AlertTriangle,
  FileText,
  Clock
} from "lucide-react"
import Link from "next/link"

export function ManagerDashboard() {
  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Manager Dashboard</h1>
              </div>
              <p className="text-violet-100 text-lg mb-4">
                Team management and operational oversight
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-violet-100">24 Team Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-violet-200" />
                  <span className="text-sm text-violet-100">8 Active Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-violet-200" />
                  <span className="text-sm text-violet-100">87% Completion Rate</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-3">
              <Link href="/manager/reports">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </Link>
              <Link href="/manager/team">
                <Button className="bg-white text-violet-600 hover:bg-white/90">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:18px_18px]"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
        <StatsCard
          title="Team Members"
          value="24"
          change="+3"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatsCard
          title="Active Projects"
          value="8"
          change="+2"
          changeType="positive"
          icon={<Activity className="h-6 w-6 text-green-600" />}
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          change="+5%"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
        />
        <StatsCard
          title="Pending Reviews"
          value="12"
          change="-3"
          changeType="positive"
          icon={<Clock className="h-6 w-6 text-orange-600" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Team Performance
            </CardTitle>
            <CardDescription>Current team metrics and productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PerformanceItem
                name="Development Team"
                progress={92}
                status="excellent"
                members={8}
              />
              <PerformanceItem
                name="Design Team"
                progress={78}
                status="good"
                members={4}
              />
              <PerformanceItem
                name="QA Team"
                progress={85}
                status="good"
                members={3}
              />
              <PerformanceItem
                name="Marketing Team"
                progress={95}
                status="excellent"
                members={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest team activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                action="Project milestone completed"
                team="Development Team"
                time="2 hours ago"
                type="success"
              />
              <ActivityItem
                action="New team member onboarded"
                team="Design Team"
                time="1 day ago"
                type="info"
              />
              <ActivityItem
                action="Performance review scheduled"
                team="QA Team"
                time="2 days ago"
                type="warning"
              />
              <ActivityItem
                action="Budget approval requested"
                team="Marketing Team"
                time="3 days ago"
                type="info"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
        <ManagementCard
          title="Team Management"
          description="Manage team members and assignments"
          icon={<Users className="h-8 w-8" />}
          href="/manager/team"
          color="blue"
          actions={["View Team", "Add Member", "Assign Tasks"]}
        />
        <ManagementCard
          title="Project Oversight"
          description="Monitor project progress and deadlines"
          icon={<BarChart3 className="h-8 w-8" />}
          href="/manager/projects"
          color="green"
          actions={["View Projects", "Set Deadlines", "Track Progress"]}
        />
        <ManagementCard
          title="Performance Reviews"
          description="Conduct and manage team performance"
          icon={<UserCheck className="h-8 w-8" />}
          href="/manager/reviews"
          color="purple"
          actions={["Schedule Reviews", "View Metrics", "Set Goals"]}
        />
      </div>

      {/* Alerts and Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Notifications
          </CardTitle>
          <CardDescription>Important items requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <AlertItem
              title="Budget Review Due"
              description="Q4 budget review needs approval by end of week"
              priority="high"
              dueDate="2 days"
            />
            <AlertItem
              title="Team Performance Meeting"
              description="Monthly team performance review scheduled"
              priority="medium"
              dueDate="1 week"
            />
            <AlertItem
              title="New Policy Update"
              description="HR policy changes require team communication"
              priority="low"
              dueDate="2 weeks"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper components (reused from admin dashboard with manager-specific modifications)
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
                {changeType === 'neutral' && <BarChart3 className="h-3 w-3" />}
                <span>{change} from last month</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PerformanceItemProps {
  name: string
  progress: number
  status: "excellent" | "good" | "needs-improvement"
  members: number
}

function PerformanceItem({ name, progress, status, members }: PerformanceItemProps) {
  const statusColors = {
    excellent: "bg-green-100 text-green-800",
    good: "bg-blue-100 text-blue-800",
    "needs-improvement": "bg-orange-100 text-orange-800"
  }

  const progressColors = {
    excellent: "bg-green-500",
    good: "bg-blue-500",
    "needs-improvement": "bg-orange-500"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{members} members</p>
        </div>
        <Badge variant="outline" className={`text-xs ${statusColors[status]}`}>
          {status.replace("-", " ")}
        </Badge>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${progressColors[status]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right">{progress}% efficiency</p>
    </div>
  )
}

interface ActivityItemProps {
  action: string
  team: string
  time: string
  type: "success" | "info" | "warning"
}

function ActivityItem({ action, team, time, type }: ActivityItemProps) {
  const typeColors = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-orange-100 text-orange-800"
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{action}</p>
        <p className="text-xs text-gray-500">{team}</p>
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

interface ManagementCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: "blue" | "green" | "purple"
  actions: string[]
}

function ManagementCard({ title, description, icon, href, color, actions }: ManagementCardProps) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100"
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className={`w-16 h-16 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2">
          {actions.map((action, index) => (
            <div key={index} className="flex items-center text-xs text-gray-500">
              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
              {action}
            </div>
          ))}
        </div>
        
        <Link href={href}>
          <Button className="w-full mt-4" size="sm">Access {title}</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

interface AlertItemProps {
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate: string
}

function AlertItem({ title, description, priority, dueDate }: AlertItemProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-orange-100 text-orange-800 border-orange-200",
    low: "bg-blue-100 text-blue-800 border-blue-200"
  }

  return (
    <div className={`p-3 rounded-lg border ${priorityColors[priority]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs mt-1 opacity-90">{description}</p>
        </div>
        <div className="text-right">
          <Badge variant="outline" className="text-xs">
            {priority} priority
          </Badge>
          <p className="text-xs mt-1 opacity-75">Due in {dueDate}</p>
        </div>
      </div>
    </div>
  )
}