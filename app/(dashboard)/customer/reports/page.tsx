"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Plus,
  Clock,
  CheckCircle
} from "lucide-react"

export default function CustomerReports() {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Exports</h1>
            <p className="text-gray-600 mt-2">
              Generate and download detailed reports of your account activity
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Usage Report</h3>
                  <p className="text-sm text-gray-600">API calls and usage statistics</p>
                  <Button size="sm" className="mt-2">Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Billing Report</h3>
                  <p className="text-sm text-gray-600">Invoices and payment history</p>
                  <Button size="sm" className="mt-2">Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Activity Report</h3>
                  <p className="text-sm text-gray-600">Account activity and logs</p>
                  <Button size="sm" className="mt-2">Generate</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Reports
            </CardTitle>
            <CardDescription>Your recently generated reports and exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Monthly Usage Report - November 2024",
                  type: "Usage Report",
                  date: "Nov 30, 2024",
                  status: "completed",
                  size: "2.3 MB",
                  format: "PDF"
                },
                {
                  name: "Billing Summary - Q4 2024",
                  type: "Billing Report",
                  date: "Nov 28, 2024",
                  status: "completed",
                  size: "1.8 MB",
                  format: "Excel"
                },
                {
                  name: "API Activity Log - Last 30 Days",
                  type: "Activity Report",
                  date: "Nov 25, 2024",
                  status: "processing",
                  size: "Processing...",
                  format: "CSV"
                },
                {
                  name: "User Analytics Report - October 2024",
                  type: "Analytics Report",
                  date: "Oct 31, 2024",
                  status: "completed",
                  size: "4.1 MB",
                  format: "PDF"
                },
                {
                  name: "Security Audit Log - October 2024",
                  type: "Security Report",
                  date: "Oct 28, 2024",
                  status: "completed",
                  size: "892 KB",
                  format: "JSON"
                }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-sm text-gray-500">{report.date}</span>
                        <span className="text-sm text-gray-500">{report.size}</span>
                        <Badge variant="secondary" className="text-xs">
                          {report.format}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {report.status === 'completed' ? (
                      <>
                        <Badge variant="success" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ready
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Pre-configured report templates for common use cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Weekly Summary",
                  description: "Weekly overview of API usage, errors, and performance metrics",
                  frequency: "Weekly",
                  lastRun: "Nov 25, 2024"
                },
                {
                  name: "Monthly Billing",
                  description: "Detailed billing information and usage costs breakdown",
                  frequency: "Monthly",
                  lastRun: "Nov 1, 2024"
                },
                {
                  name: "Security Audit",
                  description: "Security events, failed logins, and access patterns",
                  frequency: "Monthly",
                  lastRun: "Oct 28, 2024"
                },
                {
                  name: "Performance Analysis",
                  description: "Response times, throughput, and system performance metrics",
                  frequency: "Bi-weekly",
                  lastRun: "Nov 15, 2024"
                }
              ].map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {template.frequency}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Last run: {template.lastRun}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Configure how you want to receive your reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">File Formats</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">PDF</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Excel (XLSX)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">CSV</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">JSON</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Delivery Method</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" defaultChecked />
                    <span className="text-sm">Download from dashboard</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" />
                    <span className="text-sm">Email notification</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="delivery" />
                    <span className="text-sm">API webhook</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Schedule</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Auto-generate weekly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Auto-generate monthly</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">Send email notifications</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}