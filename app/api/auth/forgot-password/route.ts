import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, a reset link has been sent." },
        { status: 200 }
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    })

    // Create new reset token (expires in 1 hour)
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: hashedToken,
        expires: new Date(Date.now() + 3600000), // 1 hour
      },
    })

    // TODO: Send email with reset link
    // For now, we'll just log it (in production, use a service like SendGrid, Resend, etc.)
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`
    console.log("Password reset URL:", resetUrl)
    
    // In production, you would send an email here:
    // await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json(
      { message: "If an account exists, a reset link has been sent." },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    )
  }
}
