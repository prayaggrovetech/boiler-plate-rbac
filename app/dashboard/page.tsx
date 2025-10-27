"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DashboardRenderer } from "@/components/dashboard/dashboard-renderer"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardRenderer />
    </DashboardLayout>
  )
}