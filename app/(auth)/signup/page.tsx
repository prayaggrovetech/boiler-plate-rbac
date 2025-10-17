import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your account to get started with our SaaS platform and access all features.",
}

import { SignupForm } from "../../../components/auth/signup-form"

export default function SignupPage() {
  return <SignupForm />
}