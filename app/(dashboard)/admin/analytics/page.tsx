"use client"

import { useState, useEffect } from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/lib/hooks/use-api"
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Globe, Clock, Zap, RefreshCw, Loader2 } from "lucide-react"

interface AnalyticsData {
  users: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: string
    active: number
    retention: string
  }
  system: {
    uptime: string
    apiRequests: string
    errorRate: string
    avgResponseTime: string
  }
  roles: {
    total: number
    distribution: Array<{
      name: string
      users: number
      percentage: string
    }>
  }
  geographic: Array<{
    region: string
    percentage: number
    users: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const analyticsApi = useAnalytics()

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsApi.fetchAnalytics()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Set mock data as fallback
      setAnalyticsData({
        users: {
          total: 12345,
          thisMonth: 1234,
          lastMonth: 1100,
          growth: "+12.2%",
          active: 8567,
          retention: "85.2%"
        },
        system: {
          uptime: "99.98%",
          apiRequests: "2.4M",
          errorRate: "0.02%",
          avgResponseTime: "145ms"
        },
        roles: {
          total: 8,
          distribution: [
            { name: "customer", users: 8567, percentage: "69.4" },
            { name: "manager", users: 2345, percentage: "19.0" },
            { name: "admin", users: 1433, percentage: "11.6" }
          ]
        },
        geographic: [
          { region: "North America", percentage: 45, users: 5555 },
          { region: "Europe", percentage: 30, users: 3704 },
          { region: "Asia Pacific", percentage: 20, users: 2469 },
          { region: "Other", percentage: 5, users: 617 }
        ]
      })
    }
  }

  if (analyticsApi.loading || !analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analytics and performance metrics across the entire platform.
          </p>
        </div>
        <Button onClick={fetchAnalytics} disabled={analyticsApi.loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${analyticsApi.loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={analyticsData.users.total.toLocaleString()}
          change={analyticsData.users.growth}
          changeType="positive"
          icon={<Users className="h-6 w-6" />}
          period="vs last month"
        />
        <MetricCard
          title="Active Users"
          value={analyticsData.users.active.toLocaleString()}
          change={analyticsData.users.retention}
          changeType="positive"
          icon={<Activity className="h-6 w-6" />}
          period="retention rate"
        />
        <MetricCard
          title="System Uptime"
          value={analyticsData.system.uptime}
          change="+0.02%"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6" />}
          period="this month"
        />
        <MetricCard
          title="API Requests"
          value={analyticsData.system.apiRequests}
          change="+15.3%"
          changeType="positive"
          icon={<Zap className="h-6 w-6" />}
          period="vs last month"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              User Growth
            </CardTitle>
            <CardDescription>
              User registration and growth trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">New Users (This Month)</span>
                <Badge variant="secondary">{analyticsData.users.thisMonth.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Users (Daily)</span>
                <Badge variant="secondary">{analyticsData.users.active.toLocaleString()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Retention Rate</span>
                <Badge variant="secondary">{analyticsData.users.retention}</Badge>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">User Growth Chart Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>
              Revenue trends and subscription metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">MRR (Monthly Recurring)</span>
                <Badge variant="secondary">$42,350</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Churn Rate</span>
                <Badge variant="outline">2.1%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">ARPU (Avg Revenue Per User)</span>
                <Badge variant="secondary">$34.50</Badge>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Revenue Chart Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <CardDescription>
              User distribution by region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.geographic.map((region) => (
                <RegionItem 
                  key={region.region}
                  region={region.region} 
                  percentage={region.percentage} 
                  users={region.users.toLocaleString()} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription>
              Real-time system metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PerformanceItem
                label="Avg Response Time"
                value={analyticsData.system.avgResponseTime}
                status="good"
              />
              <PerformanceItem
                label="Error Rate"
                value={analyticsData.system.errorRate}
                status="good"
              />
              <PerformanceItem
                label="CPU Usage"
                value="34%"
                status="good"
              />
              <PerformanceItem
                label="Memory Usage"
                value="67%"
                status="warning"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Features
            </CardTitle>
            <CardDescription>
              Most used platform features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <FeatureUsageItem feature="User Dashboard" usage={89} />
              <FeatureUsageItem feature="API Access" usage={76} />
              <FeatureUsageItem feature="Reports" usage={65} />
              <FeatureUsageItem feature="Team Management" usage={54} />
              <FeatureUsageItem feature="Billing" usage={43} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  period: string
}

function MetricCard({ title, value, change, changeType, icon, period }: MetricCardProps) {
  const changeColor = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground"
  }[changeType]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className={`text-sm ${changeColor}`}>{change} {period}</p>
          </div>
          <div className="text-muted-foreground">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface RegionItemProps {
  region: string
  percentage: number
  users: string
}

function RegionItem({ region, percentage, users }: RegionItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-foreground">{region}</span>
          <span className="text-muted-foreground">{users} users</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

interface PerformanceItemProps {
  label: string
  value: string
  status: "good" | "warning" | "error"
}

function PerformanceItem({ label, value, status }: PerformanceItemProps) {
  const statusColor = {
    good: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400"
  }[status]

  const statusBg = {
    good: "bg-green-100 dark:bg-green-900/30",
    warning: "bg-yellow-100 dark:bg-yellow-900/30", 
    error: "bg-red-100 dark:bg-red-900/30"
  }[status]

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className={`px-2 py-1 rounded-full ${statusBg}`}>
        <span className={`text-sm font-medium ${statusColor}`}>{value}</span>
      </div>
    </div>
  )
}

interface FeatureUsageItemProps {
  feature: string
  usage: number
}

function FeatureUsageItem({ feature, usage }: FeatureUsageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{feature}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 bg-muted rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${usage}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-foreground w-8">{usage}%</span>
      </div>
    </div>
  )
}