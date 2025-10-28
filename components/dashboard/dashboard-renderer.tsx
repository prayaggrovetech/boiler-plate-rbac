"use client"

import { useSession } from "next-auth/react"
import { AdminDashboard } from "./admin-dashboard"
import { ManagerDashboard } from "./manager-dashboard"
import { CustomerDashboard } from "./customer-dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Loader2 } from "lucide-react"

export function DashboardRenderer() {
  const { data: session, status } = useSession()

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Loading Dashboard</CardTitle>
            <CardDescription>
              Preparing your personalized dashboard...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-red-900 dark:text-red-400">Access Denied</CardTitle>
            <CardDescription>
              You need to be logged in to access the dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // Get user roles
  const roles = session.user?.roles || []
  const roleNames = roles.map((role: any) => role.name)

  // Render appropriate dashboard based on roles
  // Priority: admin > manager > customer
  if (roleNames.includes("admin")) {
    return <AdminDashboard />
  }
  
  if (roleNames.includes("manager")) {
    return <ManagerDashboard />
  }
  
  if (roleNames.includes("customer")) {
    return <CustomerDashboard />
  }

  // No recognized roles
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-orange-900 dark:text-orange-400">No Dashboard Available</CardTitle>
          <CardDescription>
            Your account doesn't have the necessary permissions to access any dashboard. 
            Please contact your administrator.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">
            Current roles: {roleNames.length > 0 ? roleNames.join(", ") : "None"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}