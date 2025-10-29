import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const smtpSettingsSchema = z.object({
  host: z.string().min(1, "SMTP host is required"),
  port: z.number().min(1).max(65535),
  secure: z.boolean(),
  user: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  fromName: z.string().min(1, "From name is required"),
  fromEmail: z.string().email("Invalid from email"),
})

// GET - Get SMTP settings
export async function GET(request: NextRequest) {
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

    const settings = await prisma.smtpSettings.findFirst({
      where: { isActive: true },
      select: {
        id: true,
        host: true,
        port: true,
        secure: true,
        user: true,
        password: true, // In production, don't return the actual password
        fromName: true,
        fromEmail: true,
        isActive: true,
        updatedAt: true,
      }
    })

    // Mask password for security
    if (settings) {
      return NextResponse.json({
        settings: {
          ...settings,
          password: settings.password ? "••••••••••••" : "",
          hasPassword: !!settings.password,
        }
      })
    }

    return NextResponse.json({ settings: null })
  } catch (error) {
    console.error("Get SMTP settings error:", error)
    return NextResponse.json(
      { error: "Failed to fetch SMTP settings" },
      { status: 500 }
    )
  }
}

// POST/PUT - Create or update SMTP settings
export async function POST(request: NextRequest) {
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
    const validatedData = smtpSettingsSchema.parse(body)

    // Deactivate all existing settings
    await prisma.smtpSettings.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    })

    // Create new settings
    const settings = await prisma.smtpSettings.create({
      data: {
        ...validatedData,
        isActive: true,
      },
    })

    return NextResponse.json({
      message: "SMTP settings saved successfully",
      settings: {
        ...settings,
        password: "••••••••••••",
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Save SMTP settings error:", error)
    return NextResponse.json(
      { error: "Failed to save SMTP settings" },
      { status: 500 }
    )
  }
}

// PATCH - Update existing SMTP settings
export async function PATCH(request: NextRequest) {
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
    
    // Find active settings
    const currentSettings = await prisma.smtpSettings.findFirst({
      where: { isActive: true },
    })

    if (!currentSettings) {
      return NextResponse.json(
        { error: "No active SMTP settings found" },
        { status: 404 }
      )
    }

    // If password is masked, keep the existing one
    const updateData: any = { ...body }
    if (body.password === "••••••••••••" || !body.password) {
      delete updateData.password
    }

    const updatedSettings = await prisma.smtpSettings.update({
      where: { id: currentSettings.id },
      data: updateData,
    })

    return NextResponse.json({
      message: "SMTP settings updated successfully",
      settings: {
        ...updatedSettings,
        password: "••••••••••••",
      },
    })
  } catch (error) {
    console.error("Update SMTP settings error:", error)
    return NextResponse.json(
      { error: "Failed to update SMTP settings" },
      { status: 500 }
    )
  }
}
