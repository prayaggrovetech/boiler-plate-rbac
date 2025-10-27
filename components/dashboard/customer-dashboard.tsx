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
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Welcome back!</h1>
              </div>
              <p className="text-emerald-100 text-lg mb-4">
                Here's what's happening with your account today
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-emerald-100">Account Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-emerald-200" />
                  <span className="text-sm text-emerald-100">Premium Plan</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-4">
              <Link href="/customer/profile">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <div className="text-right">
                <p className="text-emerald-100 text-sm">Usage This Month</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
            </div>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:15px_15px]"></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 4xl:grid-cols-10 gap-3">
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
    green: "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50",
    blue: "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50",
    purple: "border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50",
    orange: "border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50"
  }

  const iconColors = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600", 
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600"
  }

  return (
    <Card className={`${colorClasses[color]} hover:shadow-lg transition-all duration-200 border`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${iconColors[color]}`}>
                {icon}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{title}</p>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
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