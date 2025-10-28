import type { Metadata } from "next"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your account.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
