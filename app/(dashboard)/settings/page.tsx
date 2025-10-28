import type { Metadata } from "next"
import { ChangePasswordForm } from "@/components/auth/change-password-form"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and preferences.",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account settings and preferences
        </p>

        <div className="space-y-6">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}
