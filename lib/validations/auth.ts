import { z } from "zod"

// Common validation rules
const email = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(255, "Email is too long")

const password = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password is too long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  )

const name = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name is too long")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")

// Login schema
export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required")
})

// Signup schema
export const signupSchema = z.object({
  email,
  name,
  password,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Change password schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: password,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Reset password schema
export const resetPasswordSchema = z.object({
  email
})

// Types
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>