import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/config"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const roles = session.user?.roles || []
  const roleNames = roles.map((role: any) => role.name)

  // Redirect based on user roles
  if (roleNames.includes("admin")) {
    redirect("/admin/dashboard")
  } else if (roleNames.includes("manager")) {
    redirect("/manager/dashboard")
  } else if (roleNames.includes("customer")) {
    redirect("/customer/dashboard")
  } else {
    redirect("/unauthorized")
  }
}