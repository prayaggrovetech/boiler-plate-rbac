import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, DollarSign, TrendingUp, Users, Download, Calendar, BarChart3, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Billing Overview",
  description: "System-wide billing analytics and revenue management for administrators.",
}

export default function AdminBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing Overview</h1>
          <p className="text-muted-foreground mt-2">
            Monitor revenue, subscriptions, and billing analytics across the platform.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueCard
          title="Monthly Revenue"
          value="$45,678"
          change="+12.5%"
          changeType="positive"
          icon={<DollarSign className="h-6 w-6" />}
          period="vs last month"
        />
        <RevenueCard
          title="Annual Revenue"
          value="$487,234"
          change="+18.3%"
          changeType="positive"
          icon={<TrendingUp className="h-6 w-6" />}
          period="vs last year"
        />
        <RevenueCard
          title="Active Subscriptions"
          value="2,847"
          change="+156"
          changeType="positive"
          icon={<Users className="h-6 w-6" />}
          period="this month"
        />
        <RevenueCard
          title="Churn Rate"
          value="2.1%"
          change="-0.3%"
          changeType="positive"
          icon={<AlertCircle className="h-6 w-6" />}
          period="vs last month"
        />
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Plans
            </CardTitle>
            <CardDescription>
              Revenue breakdown by subscription tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PlanMetric
                name="Enterprise"
                subscribers={234}
                revenue="$23,400"
                percentage={51}
                color="purple"
              />
              <PlanMetric
                name="Professional"
                subscribers={1456}
                revenue="$14,560"
                percentage={32}
                color="blue"
              />
              <PlanMetric
                name="Starter"
                subscribers={1157}
                revenue="$7,718"
                percentage={17}
                color="green"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Billing Cycles
            </CardTitle>
            <CardDescription>
              Revenue by billing frequency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <BillingCycleMetric
                cycle="Annual"
                subscribers={1234}
                revenue="$37,020"
                percentage={68}
                discount="20% discount"
              />
              <BillingCycleMetric
                cycle="Monthly"
                subscribers={1613}
                revenue="$17,343"
                percentage={32}
                discount="Standard rate"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Latest billing events and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <TransactionItem
              id="TXN-2024-001234"
              customer="Acme Corporation"
              plan="Enterprise Annual"
              amount="$1,200.00"
              status="completed"
              date="2024-01-15 14:30"
              method="Credit Card"
            />
            <TransactionItem
              id="TXN-2024-001233"
              customer="Tech Startup Inc"
              plan="Professional Monthly"
              amount="$29.99"
              status="completed"
              date="2024-01-15 14:25"
              method="PayPal"
            />
            <TransactionItem
              id="TXN-2024-001232"
              customer="Digital Agency LLC"
              plan="Professional Annual"
              amount="$299.99"
              status="pending"
              date="2024-01-15 14:20"
              method="Bank Transfer"
            />
            <TransactionItem
              id="TXN-2024-001231"
              customer="Freelancer Pro"
              plan="Starter Monthly"
              amount="$9.99"
              status="failed"
              date="2024-01-15 14:15"
              method="Credit Card"
            />
            <TransactionItem
              id="TXN-2024-001230"
              customer="Enterprise Solutions"
              plan="Enterprise Monthly"
              amount="$199.99"
              status="completed"
              date="2024-01-15 14:10"
              method="Credit Card"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>
              Distribution of payment methods used
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <PaymentMethodItem method="Credit Card" percentage={72} count="2,051" />
              <PaymentMethodItem method="PayPal" percentage={18} count="513" />
              <PaymentMethodItem method="Bank Transfer" percentage={8} count="228" />
              <PaymentMethodItem method="Other" percentage={2} count="57" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Billing Issues
            </CardTitle>
            <CardDescription>
              Failed payments and billing problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <IssueItem
                type="Failed Payment"
                count={23}
                description="Credit card declined or expired"
                severity="high"
              />
              <IssueItem
                type="Dunning Process"
                count={12}
                description="Customers in payment retry cycle"
                severity="medium"
              />
              <IssueItem
                type="Refund Requests"
                count={5}
                description="Pending refund processing"
                severity="low"
              />
              <IssueItem
                type="Billing Disputes"
                count={2}
                description="Chargeback or dispute claims"
                severity="high"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface RevenueCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  period: string
}

function RevenueCard({ title, value, change, changeType, icon, period }: RevenueCardProps) {
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

interface PlanMetricProps {
  name: string
  subscribers: number
  revenue: string
  percentage: number
  color: "purple" | "blue" | "green"
}

function PlanMetric({ name, subscribers, revenue, percentage, color }: PlanMetricProps) {
  const colorClasses = {
    purple: "bg-purple-500 dark:bg-purple-600",
    blue: "bg-blue-500 dark:bg-blue-600",
    green: "bg-green-500 dark:bg-green-600"
  }[color]

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{revenue}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">{subscribers} subscribers</span>
        <span className="text-sm font-medium text-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

interface BillingCycleMetricProps {
  cycle: string
  subscribers: number
  revenue: string
  percentage: number
  discount: string
}

function BillingCycleMetric({ cycle, subscribers, revenue, percentage, discount }: BillingCycleMetricProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="font-medium text-foreground">{cycle}</span>
          <span className="text-sm text-muted-foreground ml-2">({discount})</span>
        </div>
        <span className="text-sm text-muted-foreground">{revenue}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">{subscribers} subscribers</span>
        <span className="text-sm font-medium text-foreground">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="h-2 rounded-full bg-blue-500 dark:bg-blue-600"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

interface TransactionItemProps {
  id: string
  customer: string
  plan: string
  amount: string
  status: "completed" | "pending" | "failed"
  date: string
  method: string
}

function TransactionItem({ id, customer, plan, amount, status, date, method }: TransactionItemProps) {
  const statusConfig = {
    completed: { color: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400", label: "Completed" },
    pending: { color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400", label: "Pending" },
    failed: { color: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400", label: "Failed" }
  }[status]

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground">{id}</span>
          <Badge className={statusConfig.color}>
            {statusConfig.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{customer} • {plan}</p>
        <p className="text-xs text-muted-foreground">{date} • {method}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-foreground">{amount}</p>
      </div>
    </div>
  )
}

interface PaymentMethodItemProps {
  method: string
  percentage: number
  count: string
}

function PaymentMethodItem({ method, percentage, count }: PaymentMethodItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-foreground">{method}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 bg-muted rounded-full h-2">
          <div 
            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-muted-foreground w-12">{percentage}%</span>
        <span className="text-xs text-muted-foreground">({count})</span>
      </div>
    </div>
  )
}

interface IssueItemProps {
  type: string
  count: number
  description: string
  severity: "low" | "medium" | "high"
}

function IssueItem({ type, count, description, severity }: IssueItemProps) {
  const severityColor = {
    low: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    high: "text-red-600 dark:text-red-400"
  }[severity]

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{type}</span>
          <span className={`text-sm font-medium ${severityColor}`}>
            {count}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}