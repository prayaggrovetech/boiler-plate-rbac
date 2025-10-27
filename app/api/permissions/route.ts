import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { PermissionChecker } from "@/lib/rbac/permissions"

const createPermissionSchema = z.object({
  name: z.string().min(1).max(100),
  resource: z.string().min(1).max(50),
  action: z.string().min(1).max(50),
  description: z.string().optional()
})

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can view permissions
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'view:permissions'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const permissions = await prisma.permission.findMany({
      include: {
        rolePermissions: {
          include: {
            role: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { resource: 'asc' },
        { action: 'asc' }
      ]
    })

    const transformedPermissions = permissions.map(permission => ({
      id: permission.id,
      name: permission.name,
      resource: permission.resource,
      action: permission.action,
      description: permission.description,
      createdAt: permission.createdAt,
      roles: permission.rolePermissions.map(rp => rp.role),
      roleCount: permission.rolePermissions.length
    }))

    // Group permissions by resource for easier management
    const groupedPermissions = transformedPermissions.reduce((acc, permission) => {
      if (!acc[permission.resource]) {
        acc[permission.resource] = []
      }
      acc[permission.resource].push(permission)
      return acc
    }, {} as Record<string, typeof transformedPermissions>)

    return NextResponse.json({ 
      permissions: transformedPermissions,
      groupedPermissions
    })
  } catch (error) {
    console.error("Error fetching permissions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can create permissions
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:permissions', 'create:permissions'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createPermissionSchema.parse(body)

    // Auto-generate name if not provided or validate format
    const expectedName = `${validatedData.action}:${validatedData.resource}`
    if (validatedData.name !== expectedName) {
      validatedData.name = expectedName
    }

    // Check if permission already exists
    const existingPermission = await prisma.permission.findUnique({
      where: { name: validatedData.name }
    })

    if (existingPermission) {
      return NextResponse.json({ error: "Permission already exists" }, { status: 400 })
    }

    // Create permission
    const permission = await prisma.permission.create({
      data: validatedData
    })

    return NextResponse.json({ permission }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error creating permission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}