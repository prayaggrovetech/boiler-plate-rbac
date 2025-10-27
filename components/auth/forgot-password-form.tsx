"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ForgotPasswordForm>({
    email: "",
  })
  const [errors, setErrors] = useState<Partial<ForgotPasswordForm>>({})

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (status === "authenticated" && session?.user?.roles) {
      const roles = session.user.roles.map((role: any) => role.name)

      const redirectPath = "/dashboard"

      router.push(redirectPath)
    }
  }, [status, session, router])

  // Show loading while checking authentication status
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Don't render the form if user is authenticated (will redirect)
  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: keyof ForgotPasswordForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = forgotPasswordSchema.parse(formData)

      // Simulate API call for password reset
      // In a real implementation, this would send a reset email
      await new Promise(resolve => setTimeout(resolve, 2000))

      setIsSubmitted(true)
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ForgotPasswordForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ForgotPasswordForm] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Micro SaaS</span>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to{" "}
                <span className="font-medium text-gray-900">{formData.email}</span>
              </p>
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/login">Back to Sign In</Link>
                </Button>
                <p className="text-sm text-gray-600">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    try again
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Micro SaaS</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-gray-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField label="Email Address" required error={errors.email}>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </FormField>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
              >
                Send Reset Instructions
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}