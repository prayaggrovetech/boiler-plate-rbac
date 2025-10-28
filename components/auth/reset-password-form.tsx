"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { z } from "zod"

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<ResetPasswordForm>>({})
  
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Invalid Link",
        description: "This password reset link is invalid.",
      })
      router.push("/forgot-password")
    }
  }, [token, router, toast])

  const handleInputChange = (field: keyof ResetPasswordForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ]
    
    strength = checks.filter(Boolean).length
    
    if (strength < 2) return { level: "weak", color: "text-red-600", width: "w-1/4" }
    if (strength < 4) return { level: "medium", color: "text-yellow-600", width: "w-2/4" }
    if (strength < 5) return { level: "strong", color: "text-green-600", width: "w-3/4" }
    return { level: "very strong", color: "text-green-600", width: "w-full" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = resetPasswordSchema.parse(formData)

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: validatedData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to reset password")
      }

      setIsSuccess(true)
      toast({
        title: "Password Reset Successful",
        description: "Your password has been reset. You can now sign in.",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ResetPasswordForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ResetPasswordForm] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          variant: "destructive",
          title: "Reset Failed",
          description: error instanceof Error ? error.message : "An unexpected error occurred.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-base">MS</span>
              </div>
              <span className="font-bold text-xl text-foreground">Micro SaaS</span>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Password Reset Complete
              </h2>
              <p className="text-muted-foreground mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!token) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-base">MS</span>
            </div>
            <span className="font-bold text-xl text-foreground">Micro SaaS</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">
            Reset your password
          </h2>
          <p className="mt-2 text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              Choose a strong password to secure your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField label="New Password" required error={errors.password}>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-medium ${passwordStrength.color}`}>
                        {passwordStrength.level}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                      <div
                        className={`bg-current h-2 rounded-full transition-all ${passwordStrength.color} ${passwordStrength.width}`}
                      />
                    </div>
                  </div>
                )}
              </FormField>

              <FormField label="Confirm Password" required error={errors.confirmPassword}>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormField>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
              >
                Reset Password
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
