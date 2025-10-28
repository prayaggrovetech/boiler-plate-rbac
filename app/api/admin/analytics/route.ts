import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/analytics - Get system analytics
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userRoles = session.user.roles?.map((role: any) => role.name) || []
    if (!userRoles.includes('admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get current date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get user statistics
    const [
      totalUsers,
      usersThisMonth,
      usersLastMonth,
      totalRoles
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfLastMonth,
            lt: startOfMonth
          }
        }
      }),
      prisma.role.count()
    ])

    // Calculate active users (users with sessions in last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const activeUsers = await prisma.user.count({
      where: {
        sessions: {
          some: {
            expires: {
              gte: thirtyDaysAgo
            }
          }
        }
      }
    })

    // Calculate growth percentages
    const userGrowth = usersLastMonth > 0 
      ? ((usersThisMonth - usersLastMonth) / usersLastMonth * 100).toFixed(1)
      : '0'

    // Get user distribution by roles
    const roleDistribution = await prisma.role.findMany({
      include: {
        _count: {
          select: {
            userRoles: true
          }
        }
      }
    })

    // Get recent user registrations (last 7 days)
    const last7Days = new Date()
    last7Days.setDate(last7Days.getDate() - 7)
    
    const recentRegistrations = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: last7Days
        }
      },
      select: {
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Group registrations by day
    const registrationsByDay = recentRegistrations.reduce((acc: any, user) => {
      const date = user.createdAt.toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    // Mock some additional metrics (replace with real data)
    const analytics = {
      users: {
        total: totalUsers,
        thisMonth: usersThisMonth,
        lastMonth: usersLastMonth,
        growth: `${userGrowth > '0' ? '+' : ''}${userGrowth}%`,
        active: activeUsers,
        retention: '85.2%' // Mock data
      },
      system: {
        uptime: '99.98%',
        apiRequests: '2.4M',
        errorRate: '0.02%',
        avgResponseTime: '145ms'
      },
      roles: {
        total: totalRoles,
        distribution: roleDistribution.map(role => ({
          name: role.name,
          users: role._count.userRoles,
          percentage: totalUsers > 0 ? ((role._count.userRoles / totalUsers) * 100).toFixed(1) : '0'
        }))
      },
      registrations: {
        byDay: registrationsByDay,
        recent: recentRegistrations.length
      },
      // Mock geographic data
      geographic: [
        { region: 'North America', percentage: 45, users: Math.floor(totalUsers * 0.45) },
        { region: 'Europe', percentage: 30, users: Math.floor(totalUsers * 0.30) },
        { region: 'Asia Pacific', percentage: 20, users: Math.floor(totalUsers * 0.20) },
        { region: 'Other', percentage: 5, users: Math.floor(totalUsers * 0.05) }
      ]
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}