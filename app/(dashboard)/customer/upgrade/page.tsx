"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  Star, 
  Zap,
  Shield,
  Users,
  BarChart3,
  Headphones,
  Globe
} from "lucide-react"

export default function CustomerUpgrade() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Upgrade Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock more features and scale your business with our advanced plans
          </p>
        </div>

        {/* Current Plan */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Current Plan: Premium</h3>
                  <p className="text-blue-700">$29.99/month • Next billing: Dec 15, 2024</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Premium Plan (Current) */}
          <Card className="border-2 border-blue-200">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Premium</CardTitle>
              <CardDescription>Perfect for growing businesses</CardDescription>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold">$29.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <Badge variant="secondary" className="mx-auto mt-2">Current Plan</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">10,000 API calls/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">5GB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 10 team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic analytics</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-purple-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-purple-500 text-white">Most Popular</Badge>
            </div>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For scaling businesses</CardDescription>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold">$79.99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <div className="text-sm text-green-600 mt-2">
                Save $120/year with annual billing
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">100,000 API calls/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">50GB storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">API rate limiting controls</span>
                </li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 border-gray-300">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-8 w-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
              <div className="text-center mt-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Contact us for pricing
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited API calls</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SLA guarantees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">On-premise deployment</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>Compare features across all plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Premium</th>
                    <th className="text-center py-3 px-4">Pro</th>
                    <th className="text-center py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                      API Calls per month
                    </td>
                    <td className="text-center py-3 px-4">10,000</td>
                    <td className="text-center py-3 px-4">100,000</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      Storage
                    </td>
                    <td className="text-center py-3 px-4">5GB</td>
                    <td className="text-center py-3 px-4">50GB</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      Team Members
                    </td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-gray-500" />
                      Support
                    </td>
                    <td className="text-center py-3 px-4">Email</td>
                    <td className="text-center py-3 px-4">Priority</td>
                    <td className="text-center py-3 px-4">24/7 Dedicated</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Advanced Analytics</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Custom Integrations</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">SLA Guarantees</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">❌</td>
                    <td className="text-center py-3 px-4">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Can I change my plan anytime?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.
                </p>
              </div>
              <div>
                <h4 className="font-medium">What happens to my data if I downgrade?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Your data is always safe. If you exceed the limits of a lower plan, you'll have 30 days to either upgrade again or remove excess data.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Do you offer annual discounts?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Yes! Save up to 20% when you pay annually. The discount is automatically applied at checkout.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Can I cancel anytime?</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}