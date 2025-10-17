import { NextRequest, NextResponse } from "next/server"
import { createUserWithCredentials, signUpSchema } from "@/lib/auth/utils"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedFields = signUpSchema.parse(body)
    
    // Create user
    const result = await createUserWithCredentials(validatedFields)
    
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    
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