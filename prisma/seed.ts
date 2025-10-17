import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create permissions
  const permissions = [
    // User management permissions
    { name: 'view:users', resource: 'users', action: 'view', description: 'View user list and profiles' },
    { name: 'create:users', resource: 'users', action: 'create', description: 'Create new users' },
    { name: 'update:users', resource: 'users', action: 'update', description: 'Update user information' },
    { name: 'delete:users', resource: 'users', action: 'delete', description: 'Delete users' },
    { name: 'manage:users', resource: 'users', action: 'manage', description: 'Full user management access' },

    // Role management permissions
    { name: 'view:roles', resource: 'roles', action: 'view', description: 'View roles and permissions' },
    { name: 'create:roles', resource: 'roles', action: 'create', description: 'Create new roles' },
    { name: 'update:roles', resource: 'roles', action: 'update', description: 'Update role information' },
    { name: 'delete:roles', resource: 'roles', action: 'delete', description: 'Delete roles' },
    { name: 'manage:roles', resource: 'roles', action: 'manage', description: 'Full role management access' },

    // Analytics permissions
    { name: 'view:analytics', resource: 'analytics', action: 'view', description: 'View analytics dashboard' },
    { name: 'export:analytics', resource: 'analytics', action: 'export', description: 'Export analytics data' },

    // Profile permissions
    { name: 'view:profile', resource: 'profile', action: 'view', description: 'View own profile' },
    { name: 'update:profile', resource: 'profile', action: 'update', description: 'Update own profile' },

    // Subscription permissions
    { name: 'view:subscription', resource: 'subscription', action: 'view', description: 'View subscription details' },
    { name: 'manage:subscription', resource: 'subscription', action: 'manage', description: 'Manage subscription' },

    // Settings permissions
    { name: 'view:settings', resource: 'settings', action: 'view', description: 'View application settings' },
    { name: 'manage:settings', resource: 'settings', action: 'manage', description: 'Manage application settings' },
  ]

  console.log('📝 Creating permissions...')
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    })
  }

  // Create roles
  const roles = [
    {
      name: 'admin',
      description: 'Full system administrator with all permissions',
      permissions: [
        'manage:users', 'manage:roles', 'view:analytics', 'export:analytics',
        'view:profile', 'update:profile', 'manage:settings'
      ]
    },
    {
      name: 'manager',
      description: 'Manager with user and analytics access',
      permissions: [
        'view:users', 'update:users', 'view:roles', 'view:analytics',
        'view:profile', 'update:profile'
      ]
    },
    {
      name: 'customer',
      description: 'Standard customer with profile and subscription access',
      permissions: [
        'view:profile', 'update:profile', 'view:subscription', 'manage:subscription'
      ]
    }
  ]

  console.log('👥 Creating roles...')
  for (const roleData of roles) {
    const role = await prisma.role.upsert({
      where: { name: roleData.name },
      update: {},
      create: {
        name: roleData.name,
        description: roleData.description,
      },
    })

    // Assign permissions to role
    for (const permissionName of roleData.permissions) {
      const permission = await prisma.permission.findUnique({
        where: { name: permissionName }
      })

      if (permission) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id
            }
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permission.id
          }
        })
      }
    }
  }

  // Create default admin user
  const adminEmail = 'admin@example.com'
  const adminPassword = await bcrypt.hash('admin123', 12)

  console.log('👤 Creating default admin user...')
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'System Administrator',
      password: adminPassword,
      emailVerified: new Date(),
    },
  })

  // Assign admin role to admin user
  const adminRole = await prisma.role.findUnique({
    where: { name: 'admin' }
  })

  if (adminRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: adminRole.id
        }
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    })
  }

  // Create sample customer user
  const customerEmail = 'customer@example.com'
  const customerPassword = await bcrypt.hash('customer123', 12)

  console.log('👤 Creating sample customer user...')
  const customerUser = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {},
    create: {
      email: customerEmail,
      name: 'Sample Customer',
      password: customerPassword,
      emailVerified: new Date(),
    },
  })

  // Assign customer role to customer user
  const customerRole = await prisma.role.findUnique({
    where: { name: 'customer' }
  })

  if (customerRole) {
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: customerUser.id,
          roleId: customerRole.id
        }
      },
      update: {},
      create: {
        userId: customerUser.id,
        roleId: customerRole.id
      }
    })
  }

  console.log('✅ Database seeding completed!')
  console.log('\n📋 Default users created:')
  console.log(`   Admin: ${adminEmail} / admin123`)
  console.log(`   Customer: ${customerEmail} / customer123`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })