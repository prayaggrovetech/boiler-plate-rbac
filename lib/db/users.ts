import { prisma } from './index'
import { User, Role, Permission } from '@prisma/client'

export type UserWithRoles = User & {
  userRoles: Array<{
    role: Role & {
      rolePermissions: Array<{
        permission: Permission
      }>
    }
  }>
}

export async function getUserWithRoles(userId: string): Promise<UserWithRoles | null> {
  return await prisma.user.findUnique({
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
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email }
  })
}

export async function createUser(data: {
  email: string
  name?: string
  password?: string
  image?: string
}): Promise<User> {
  return await prisma.user.create({
    data
  })
}

export async function assignRoleToUser(userId: string, roleId: string) {
  return await prisma.userRole.create({
    data: {
      userId,
      roleId
    }
  })
}

export async function removeRoleFromUser(userId: string, roleId: string) {
  return await prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId
      }
    }
  })
}