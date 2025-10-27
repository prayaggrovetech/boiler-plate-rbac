import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { PermissionChecker } from "@/lib/rbac/permissions"

const updateRoleSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'view:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const role = await prisma.role.findUnique({
      where: { id: params.id },
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
      }
    })

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 })
    }

    const transformedRole = {
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
      users: role.userRoles.map(ur => ur.user)
    }

    return NextResponse.json({ role: transformedRole })
  } catch (error) {
    console.error("Error fetching role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'update:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateRoleSchema.parse(body)

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: params.id }
    })

    if (!existingRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 })
    }

    // Check if new name conflicts with existing role
    if (validatedData.name && validatedData.name !== existingRole.name) {
      const nameConflict = await prisma.role.findUnique({
        where: { name: validatedData.name }
      })

      if (nameConflict) {
        return NextResponse.json({ error: "Role name already exists" }, { status: 400 })
      }
    }

    // Update role
    const updatedRole = await prisma.role.update({
      where: { id: params.id },
      data: {
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.description !== undefined && { description: validatedData.description })
      }
    })

    // Update permissions if provided
    if (validatedData.permissions !== undefined) {
      // Remove existing permissions
      await prisma.rolePermission.deleteMany({
        where: { roleId: params.id }
      })

      // Add new permissions
      if (validatedData.permissions.length > 0) {
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
              roleId: params.id,
              permissionId: permission.id
            }))
          })
        }
      }
    }

    // Fetch updated role with permissions
    const roleWithPermissions = await prisma.role.findUnique({
      where: { id: params.id },
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
        ...roleWithPermissions,
        permissions: roleWithPermissions?.rolePermissions.map(rp => rp.permission) || []
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error updating role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:roles', 'delete:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: params.id },
      include: {
        userRoles: true
      }
    })

    if (!existingRole) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 })
    }

    // Prevent deletion of roles that are still assigned to users
    if (existingRole.userRoles.length > 0) {
      return NextResponse.json({ 
        error: "Cannot delete role that is assigned to users",
        assignedUsers: existingRole.userRoles.length
      }, { status: 400 })
    }

    // Prevent deletion of system roles
    const systemRoles = ['admin', 'customer', 'manager']
    if (systemRoles.includes(existingRole.name)) {
      return NextResponse.json({ error: "Cannot delete system role" }, { status: 400 })
    }

    // Delete role (permissions will be deleted automatically due to cascade)
    await prisma.role.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Role deleted successfully" })
  } catch (error) {
    console.error("Error deleting role:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}