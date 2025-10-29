import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { getEmailTemplate, updateEmailTemplate } from "@/lib/email/template-renderer"
import { z } from "zod"

const updateTemplateSchema = z.object({
  subject: z.string().min(1).optional(),
  htmlContent: z.string().min(1).optional(),
  textContent: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
})

// GET - Get single email template
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const isAdmin = session.user.roles?.some((role: any) => 
      role.name.toLowerCase() === "admin"
    )

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    const template = await getEmailTemplate(params.name)

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Get email template error:", error)
    return NextResponse.json(
      { error: "Failed to fetch email template" },
      { status: 500 }
    )
  }
}

// PATCH - Update email template
export async function PATCH(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const isAdmin = session.user.roles?.some((role: any) => 
      role.name.toLowerCase() === "admin"
    )

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = updateTemplateSchema.parse(body)

    const updatedTemplate = await updateEmailTemplate(params.name, validatedData)

    return NextResponse.json({
      message: "Template updated successfully",
      template: updatedTemplate,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Update email template error:", error)
    return NextResponse.json(
      { error: "Failed to update email template" },
      { status: 500 }
    )
  }
}
