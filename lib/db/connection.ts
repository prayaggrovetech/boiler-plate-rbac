import { prisma } from './index'

export async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database')
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    throw error
  }
}

export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect()
    console.log('✅ Disconnected from database')
  } catch (error) {
    console.error('❌ Failed to disconnect from database:', error)
    throw error
  }
}

export async function testDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('❌ Database connection test failed:', error)
    return false
  }
}

// Health check function for API routes
export async function getDatabaseHealth() {
  try {
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const end = Date.now()
    
    return {
      status: 'healthy',
      responseTime: end - start,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}