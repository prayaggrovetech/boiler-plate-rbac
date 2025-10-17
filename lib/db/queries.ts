import { prisma } from './index'
import { Prisma } from '@prisma/client'

// Common database queries for the application

export async function getUserPermissions(userId: string): Promise<string[]> {
  const userWithRoles = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userRoles: {
        include: {
          role: {
            include: {
              rolePermissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!userWithRoles) return []

  const permissions = new Set<string>()
  
  userWithRoles.userRoles.forEach(userRole => {
    userRole.role.rolePermissions.forEach(rolePermission => {
      permissions.add(rolePermission.permission.name)
    })
  })

  return Array.from(permissions)
}

export async function getUserRoles(userId: string) {
  return await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true
            }
          }
        }
      }
    }
  })
}

export async function hasPermission(userId: string, permissionName: string): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  return permissions.includes(permissionName)
}

export async function hasAnyPermission(userId: string, permissionNames: string[]): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  return permissionNames.some(permission => permissions.includes(permission))
}

export async function hasAllPermissions(userId: string, permissionNames: string[]): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  return permissionNames.every(permission => permissions.includes(permission))
}

// Get users with pagination
export async function getUsers(options: {
  page?: number
  limit?: number
  search?: string
  roleId?: string
}) {
  const { page = 1, limit = 10, search, roleId } = options
  const skip = (page - 1) * limit

  const where: Prisma.UserWhereInput = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }

  if (roleId) {
    where.userRoles = {
      some: { roleId }
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
            role: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count({ where })
  ])

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  }
}

// Get roles with user count
export async function getRolesWithUserCount() {
  return await prisma.role.findMany({
    include: {
      _count: {
        select: { userRoles: true }
      },
      rolePermissions: {
        include: {
          permission: true
        }
      }
    },
    orderBy: { name: 'asc' }
  })
}