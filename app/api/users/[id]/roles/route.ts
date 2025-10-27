import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { PermissionChecker } from "@/lib/rbac/permissions"

const assignRolesSchema = z.object({
  roleIds: z.array(z.string())
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can manage user roles
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:users', 'assign:roles'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const { roleIds } = assignRolesSchema.parse(body)

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: params.id }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prevent users from modifying their own roles (security measure)
    if (user.id === session.user.id) {
      return NextResponse.json({ error: "Cannot modify your own roles" }, { status: 400 })
    }

    // Verify all roles exist
    const roles = await prisma.role.findMany({
      where: {
        id: {
          in: roleIds
        }
      }
    })

    if (roles.length !== roleIds.length) {
      return NextResponse.json({ error: "One or more roles not found" }, { status: 400 })
    }

    // Remove existing role assignments
    await prisma.userRole.deleteMany({
      where: { userId: params.id }
    })

    // Assign new roles
    if (roleIds.length > 0) {
      await prisma.userRole.createMany({
        data: roleIds.map(roleId => ({
          userId: params.id,
          roleId
        }))
      })
    }

    // Fetch updated user with roles
    const updatedUser = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    })

    return NextResponse.json({
      user: {
        id: updatedUser!.id,
        email: updatedUser!.email,
        name: updatedUser!.name,
        roles: updatedUser!.userRoles.map(ur => ur.role)
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error assigning roles:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}