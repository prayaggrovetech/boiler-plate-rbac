import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { getAllEmailTemplates } from "@/lib/email/template-renderer"

// GET - Get all email templates
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user has admin role
    const isAdmin = session.user.roles?.some((role: any) => 
      role.name.toLowerCase() === "admin"
    )

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    const templates = await getAllEmailTemplates()

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Get email templates error:", error)
    return NextResponse.json(
      { error: "Failed to fetch email templates" },
      { status: 500 }
    )
  }
}
