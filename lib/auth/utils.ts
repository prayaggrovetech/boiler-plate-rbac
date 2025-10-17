import bcrypt from "bcryptjs"
import { z } from "zod"
import { createUser, getUserByEmail, assignRoleToUser } from "@/lib/db/users"
import { prisma } from "@/lib/db"

// Validation schemas
export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

/**
 * Create new user with credentials
 */
export async function createUserWithCredentials(data: {
  name: string
  email: string
  password: string
}) {
  try {
    // Validate input
    const validatedFields = signUpSchema.parse(data)
    
    // Check if user already exists
    const existingUser = await getUserByEmail(validatedFields.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedFields.password)

    // Create user
    const user = await createUser({
      name: validatedFields.name,
      email: validatedFields.email,
      password: hashedPassword,
    })

    // Assign default customer role
    const customerRole = await prisma.role.findUnique({
      where: { name: "customer" }
    })
    
    if (customerRole) {
      await assignRoleToUser(user.id, customerRole.id)
    }

    return { user, success: true }
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

/**
 * Authenticate user with credentials
 */
export async function authenticateUser(email: string, password: string) {
  try {
    // Validate input
    const validatedFields = signInSchema.parse({ email, password })

    // Find user
    const user = await getUserByEmail(validatedFields.email)
    if (!user || !user.password) {
      return null
    }

    // Verify password
    const isValid = await verifyPassword(validatedFields.password, user.password)
    if (!isValid) {
      return null
    }

    return user
  } catch (error) {
    console.error("Error authenticating user:", error)
    return null
  }
}

/**
 * Change user password
 */
export async function changeUserPassword(
  userId: string, 
  currentPassword: string, 
  newPassword: string
) {
  try {
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user || !user.password) {
      throw new Error("User not found")
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect")
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })

    return { success: true }
  } catch (error) {
    console.error("Error changing password:", error)
    throw error
  }
}

/**
 * Generate secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomUUID()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): {
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push("Password should be at least 8 characters long")
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Password should contain lowercase letters")
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Password should contain uppercase letters")
  }

  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push("Password should contain numbers")
  }

  if (/[^a-zA-Z\d]/.test(password)) {
    score += 1
  } else {
    feedback.push("Password should contain special characters")
  }

  return { score, feedback }
}

/**
 * Sanitize user data for client
 */
export function sanitizeUser(user: any) {
  const { password, ...sanitizedUser } = user
  return sanitizedUser
}