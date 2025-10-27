import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth/config"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { PermissionChecker } from "@/lib/rbac/permissions"
import bcrypt from "bcryptjs"

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(6),
  roles: z.array(z.string()).optional()
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can view users
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:users', 'view:users'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (role) {
      where.userRoles = {
        some: {
          role: {
            name: role
          }
        }
      }
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          userRoles: {
            include: {
              role: {
                select: {
                  id: true,
                  name: true,
                  description: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count({ where })
    ])

    const transformedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.userRoles.map(ur => ur.role)
    }))

    return NextResponse.json({
      users: transformedUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.roles) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user can create users
    if (!PermissionChecker.hasAnyPermission(session.user.roles, ['manage:users', 'create:users'])) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword
      }
    })

    // Assign roles if provided
    if (validatedData.roles && validatedData.roles.length > 0) {
      const roles = await prisma.role.findMany({
        where: {
          name: {
            in: validatedData.roles
          }
        }
      })

      if (roles.length > 0) {
        await prisma.userRole.createMany({
          data: roles.map(role => ({
            userId: user.id,
            roleId: role.id
          }))
        })
      }
    } else {
      // Assign default customer role
      const customerRole = await prisma.role.findUnique({
        where: { name: 'customer' }
      })

      if (customerRole) {
        await prisma.userRole.create({
          data: {
            userId: user.id,
            roleId: customerRole.id
          }
        })
      }
    }

    // Fetch created user with roles
    const userWithRoles = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    })

    // Remove password from response
    const { password, ...userResponse } = userWithRoles!
    
    return NextResponse.json({
      user: {
        ...userResponse,
        roles: userWithRoles?.userRoles.map(ur => ur.role) || []
      }
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input", details: error.errors }, { status: 400 })
    }
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}