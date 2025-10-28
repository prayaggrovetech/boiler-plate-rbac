"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  User, 
  CreditCard, 
  BarChart3, 
  Calendar,
  Download,
  Star,
  TrendingUp,
  Clock
} from "lucide-react"
import Link from "next/link"

export function CustomerDashboard() {
  return (
    <div className="space-y-6 w-full min-w-0">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your account today
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">Account Active</span>
            </div>
            <Link href="/customer/profile">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <QuickStat
          title="Account Status"
          value="Active"
          subtitle="Premium Plan"
          icon={<Star className="h-5 w-5 text-yellow-500" />}
          color="green"
        />
        <QuickStat
          title="Usage This Month"
          value="75%"
          subtitle="of your plan limit"
          icon={<BarChart3 className="h-5 w-5 text-blue-500" />}
          color="blue"
        />
        <QuickStat
          title="Next Billing"
          value="Dec 15"
          subtitle="$29.99/month"
          icon={<Calendar className="h-5 w-5 text-purple-500" />}
          color="purple"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Usage Overview
            </CardTitle>
            <CardDescription>Your current plan usage and limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UsageItem
              label="API Calls"
              used={7500}
              total={10000}
              unit="calls"
            />
            <UsageItem
              label="Storage"
              used={2.1}
              total={5}
              unit="GB"
            />
            <UsageItem
              label="Team Members"
              used={3}
              total={10}
              unit="members"
            />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="Profile updated"
                description="Changed email preferences"
                time="2 hours ago"
                type="profile"
              />
              <ActivityItem
                title="API key generated"
                description="Created new production key"
                time="1 day ago"
                type="api"
              />
              <ActivityItem
                title="Payment processed"
                description="Monthly subscription renewed"
                time="3 days ago"
                type="billing"
              />
              <ActivityItem
                title="Team member invited"
                description="Invited john@example.com"
                time="1 week ago"
                type="team"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <QuickActionCard
          title="Manage Profile"
          description="Update your personal information"
          icon={<User className="h-5 w-5" />}
          href="/customer/profile"
          color="blue"
        />
        <QuickActionCard
          title="Billing & Plans"
          description="View invoices and upgrade plan"
          icon={<CreditCard className="h-5 w-5" />}
          href="/customer/billing"
          color="green"
        />
        <QuickActionCard
          title="Usage Analytics"
          description="Detailed usage statistics"
          icon={<BarChart3 className="h-5 w-5" />}
          href="/customer/analytics"
          color="purple"
        />
        <QuickActionCard
          title="Download Reports"
          description="Export your data and reports"
          icon={<Download className="h-5 w-5" />}
          href="/customer/reports"
          color="orange"
        />
      </div>

      {/* Subscription Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
            Subscription Details
          </CardTitle>
          <CardDescription>Your current plan and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Current Plan</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan:</span>
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-foreground">$29.99/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Next billing:</span>
                  <span className="font-medium text-foreground">December 15, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Plan Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  10,000 API calls/month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  5GB storage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Up to 10 team members
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Advanced analytics
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Link href="/customer/billing">
              <Button variant="outline">
                Manage Billing
              </Button>
            </Link>
            <Link href="/customer/upgrade">
              <Button>
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface QuickStatProps {
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  color: "green" | "blue" | "purple" | "orange"
}

function QuickStat({ title, value, subtitle, icon, color }: QuickStatProps) {
  const colorClasses = {
    green: "border-green-200 dark:border-green-800",
    blue: "border-blue-200 dark:border-blue-800",
    purple: "border-purple-200 dark:border-purple-800",
    orange: "border-orange-200 dark:border-orange-800"
  }

  const iconColors = {
    green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", 
    purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
  }

  return (
    <Card className={`${colorClasses[color]} hover:shadow-md transition-shadow border`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-lg ${iconColors[color]}`}>
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface UsageItemProps {
  label: string
  used: number
  total: number
  unit: string
}

function UsageItem({ label, used, total, unit }: UsageItemProps) {
  const percentage = (used / total) * 100

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">
          {used.toLocaleString()} / {total.toLocaleString()} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  )
}

interface ActivityItemProps {
  title: string
  description: string
  time: string
  type: "profile" | "api" | "billing" | "team"
}

function ActivityItem({ title, description, time, type }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-2 h-2 rounded-full mt-2 ${
        type === 'profile' ? 'bg-blue-500' :
        type === 'api' ? 'bg-green-500' :
        type === 'billing' ? 'bg-purple-500' : 'bg-orange-500'
      }`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: "blue" | "green" | "purple" | "orange"
}

function QuickActionCard({ title, description, icon, href, color }: QuickActionCardProps) {
  const colorClasses = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-800",
    green: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800",
    purple: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-800",
    orange: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 group-hover:bg-orange-200 dark:group-hover:bg-orange-800"
  }

  const borderColors = {
    blue: "hover:border-blue-300 dark:hover:border-blue-700",
    green: "hover:border-green-300 dark:hover:border-green-700",
    purple: "hover:border-purple-300 dark:hover:border-purple-700",
    orange: "hover:border-orange-300 dark:hover:border-orange-700"
  }

  return (
    <Link href={href} className="block group">
      <Card className={`hover:shadow-md transition-all cursor-pointer ${borderColors[color]}`}>
        <CardContent className="p-5">
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3 transition-colors`}>
            {icon}
          </div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}