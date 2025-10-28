"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { z } from "zod"

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ChangePasswordForm = z.infer<typeof changePasswordSchema>

export function ChangePasswordForm() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<ChangePasswordForm>>({})

  // Check if user is using OAuth (no password) - we'll check this on the server side
  const [isOAuthUser, setIsOAuthUser] = useState(false)

  const handleInputChange = (field: keyof ChangePasswordForm, value: string) => {
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

  const passwordStrength = getPasswordStrength(formData.newPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = changePasswordSchema.parse(formData)

      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: validatedData.currentPassword,
          newPassword: validatedData.newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to change password")
      }

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ChangePasswordForm> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ChangePasswordForm] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          variant: "destructive",
          title: "Change Password Failed",
          description: error instanceof Error ? error.message : "An unexpected error occurred.",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isOAuthUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You're signed in with a social account (Google, etc.). Password changes are not available for OAuth accounts.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Current Password" required error={errors.currentPassword}>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </FormField>

          <FormField label="New Password" required error={errors.newPassword}>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {formData.newPassword && (
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

          <FormField label="Confirm New Password" required error={errors.confirmPassword}>
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
            loading={isLoading}
            disabled={isLoading}
          >
            Update Password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
