import { prisma } from './index'
import { Permission } from '@prisma/client'

export async function getAllPermissions(): Promise<Permission[]> {
  return await prisma.permission.findMany({
    orderBy: [
      { resource: 'asc' },
      { action: 'asc' }
    ]
  })
}

export async function getPermissionById(permissionId: string): Promise<Permission | null> {
  return await prisma.permission.findUnique({
    where: { id: permissionId }
  })
}

export async function getPermissionByName(name: string): Promise<Permission | null> {
  return await prisma.permission.findUnique({
    where: { name }
  })
}

export async function createPermission(data: {
  name: string
  resource: string
  action: string
  description?: string
}): Promise<Permission> {
  return await prisma.permission.create({
    data
  })
}

export async function updatePermission(permissionId: string, data: {
  name?: string
  resource?: string
  action?: string
  description?: string
}): Promise<Permission> {
  return await prisma.permission.update({
    where: { id: permissionId },
    data
  })
}

export async function deletePermission(permissionId: string): Promise<Permission> {
  return await prisma.permission.delete({
    where: { id: permissionId }
  })
}

export async function getPermissionsByResource(resource: string): Promise<Permission[]> {
  return await prisma.permission.findMany({
    where: { resource },
    orderBy: { action: 'asc' }
  })
}