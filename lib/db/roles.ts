import { prisma } from './index'
import { Role, Permission } from '@prisma/client'

export type RoleWithPermissions = Role & {
  rolePermissions: Array<{
    permission: Permission
  }>
}

export async function getAllRoles(): Promise<RoleWithPermissions[]> {
  return await prisma.role.findMany({
    include: {
      rolePermissions: {
        include: {
          permission: true
        }
      }
    }
  })
}

export async function getRoleById(roleId: string): Promise<RoleWithPermissions | null> {
  return await prisma.role.findUnique({
    where: { id: roleId },
    include: {
      rolePermissions: {
        include: {
          permission: true
        }
      }
    }
  })
}

export async function createRole(data: {
  name: string
  description?: string
}): Promise<Role> {
  return await prisma.role.create({
    data
  })
}

export async function updateRole(roleId: string, data: {
  name?: string
  description?: string
}): Promise<Role> {
  return await prisma.role.update({
    where: { id: roleId },
    data
  })
}

export async function deleteRole(roleId: string): Promise<Role> {
  return await prisma.role.delete({
    where: { id: roleId }
  })
}

export async function assignPermissionToRole(roleId: string, permissionId: string) {
  return await prisma.rolePermission.create({
    data: {
      roleId,
      permissionId
    }
  })
}

export async function removePermissionFromRole(roleId: string, permissionId: string) {
  return await prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId
      }
    }
  })
}