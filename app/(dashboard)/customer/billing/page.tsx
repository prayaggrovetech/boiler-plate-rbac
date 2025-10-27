"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  Download, 
  Calendar,
  DollarSign,
  FileText,
  AlertCircle
} from "lucide-react"

export default function CustomerBilling() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600 mt-2">
              Manage your subscription, billing, and payment methods
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Plan
                </CardTitle>
                <CardDescription>Your active subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Premium Plan</h3>
                    <p className="text-gray-600">Perfect for growing businesses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">$29.99</p>
                    <p className="text-gray-500">per month</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Next billing date</p>
                    <p className="font-medium">December 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Billing cycle</p>
                    <p className="font-medium">Monthly</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-8 w-8 text-gray-500" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Primary</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Billing History
                </CardTitle>
                <CardDescription>Your recent invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Nov 15, 2024", amount: "$29.99", status: "Paid", invoice: "INV-001" },
                    { date: "Oct 15, 2024", amount: "$29.99", status: "Paid", invoice: "INV-002" },
                    { date: "Sep 15, 2024", amount: "$29.99", status: "Paid", invoice: "INV-003" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">{item.invoice}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{item.amount}</span>
                        <Badge variant="success" className="text-xs">{item.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Usage Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>API Calls</span>
                    <span>7,500 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Storage</span>
                    <span>2.1 / 5 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plan Features */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    10,000 API calls/month
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    5GB storage
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Up to 10 team members
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Advanced analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Upgrade Notice */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800">Upgrade Available</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Get unlimited API calls and 50GB storage with our Pro plan.
                    </p>
                    <Button size="sm" className="mt-3">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}