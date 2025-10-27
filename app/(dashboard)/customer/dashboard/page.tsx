"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
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

export default function CustomerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your account today
            </p>
          </div>
          <Button asChild>
            <Link href="/customer/profile">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickStat
            title="Account Status"
            value="Active"
            subtitle="Premium Plan"
            icon={<Star className="h-6 w-6 text-yellow-500" />}
            color="green"
          />
          <QuickStat
            title="Usage This Month"
            value="75%"
            subtitle="of your plan limit"
            icon={<BarChart3 className="h-6 w-6 text-blue-500" />}
            color="blue"
          />
          <QuickStat
            title="Next Billing"
            value="Dec 15"
            subtitle="$29.99/month"
            icon={<Calendar className="h-6 w-6 text-purple-500" />}
            color="purple"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usage Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
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
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Manage Profile"
            description="Update your personal information"
            icon={<User className="h-6 w-6" />}
            href="/customer/profile"
            color="blue"
          />
          <QuickActionCard
            title="Billing & Plans"
            description="View invoices and upgrade plan"
            icon={<CreditCard className="h-6 w-6" />}
            href="/customer/billing"
            color="green"
          />
          <QuickActionCard
            title="Usage Analytics"
            description="Detailed usage statistics"
            icon={<BarChart3 className="h-6 w-6" />}
            href="/customer/analytics"
            color="purple"
          />
          <QuickActionCard
            title="Download Reports"
            description="Export your data and reports"
            icon={<Download className="h-6 w-6" />}
            href="/customer/reports"
            color="orange"
          />
        </div>

        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Details
            </CardTitle>
            <CardDescription>Your current plan and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Current Plan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <Badge variant="secondary">Premium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">$29.99/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next billing:</span>
                    <span className="font-medium">December 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Plan Features</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>✓ 10,000 API calls/month</li>
                  <li>✓ 5GB storage</li>
                  <li>✓ Up to 10 team members</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced analytics</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button asChild variant="outline">
                <Link href="/customer/billing">
                  Manage Billing
                </Link>
              </Button>
              <Button asChild>
                <Link href="/customer/upgrade">
                  Upgrade Plan
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
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
    green: "border-green-200 bg-green-50",
    blue: "border-blue-200 bg-blue-50",
    purple: "border-purple-200 bg-purple-50",
    orange: "border-orange-200 bg-orange-50"
  }

  return (
    <Card className={colorClasses[color]}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            {icon}
          </div>
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
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
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
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    purple: "text-purple-600 bg-purple-100",
    orange: "text-orange-600 bg-orange-100"
  }

  return (
    <Link href={href} className="block">
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
            {icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}