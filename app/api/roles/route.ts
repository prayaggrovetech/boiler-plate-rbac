import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { PermissionChecker } from "@/lib/rbac/permissions"

const createRoleSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional()
})

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can manage roles
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'view:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const roles = await prisma.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        },
        userRoles: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    const transformedRoles = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      permissions: role.rolePermissions.map(rp => ({
        id: rp.permission.id,
        name: rp.permission.name,
        resource: rp.permission.resource,
        action: rp.permission.action,
        description: rp.permission.description
      })),
      users: role.userRoles.map(ur => ur.user),
      userCount: role.userRoles.length
    }))

    return NextResponse.json({ roles: transformedRoles })
  } catch (error) {
    console.error("Error fetching roles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can create roles
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'create:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createRoleSchema.parse(body)

    // Check if role name already exists
    const existingRole = await prisma.role.findUnique({
      where: { name: validatedData.name }
    })

    if (existingRole) {
      return NextResponse.json({ error: "Role name already exists" }, { status: 400 })
    }

    // Create role
    const role = await prisma.role.create({
      data: {
        name: validatedData.name,
        description: validatedData.description
      }
    })

    // Assign permissions if provided
    if (validatedData.permissions && validatedData.permissions.length > 0) {
      const permissions = await prisma.permission.findMany({
        where: {
          name: {
            in: validatedData.permissions
          }
        }
      })

      if (permissions.length > 0) {
        await prisma.rolePermission.createMany({
          data: permissions.map(permission => ({
            roleId: role.id,
            permissionId: permission.id
          }))
        })
      }
    }

    // Fetch the created role with permissions
    const createdRole = await prisma.role.findUnique({
      where: { id: role.id },
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      }
    })

    return NextResponse.json({ 
      role: {
        ...createdRole,
        permissions: createdRole?.rolePermissions.map(rp => rp.permission) || []
      }
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error creating role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}