import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { changeUserPassword, changePasswordSchema } from "@/lib/auth/utils"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedFields = changePasswordSchema.parse(body)
    
    // Change password
    await changeUserPassword(
      session.user.id,
      validatedFields.currentPassword,
      validatedFields.newPassword
    )
    
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Change password error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          details: error.errors
        },
        { status: 400 }
      )
    }
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}