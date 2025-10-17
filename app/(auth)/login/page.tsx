import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access your dashboard and manage your SaaS application.",
}

import { LoginForm } from "../../../components/auth/login-form"

export default function LoginPage() {
  return <LoginForm />
}