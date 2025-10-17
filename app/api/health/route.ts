import { NextResponse } from 'next/server'
import { getDatabaseHealth } from '@/lib/db/connection'

export async function GET() {
  try {
    const dbHealth = await getDatabaseHealth()
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth
      }
    }

    const status = dbHealth.status === 'healthy' ? 200 : 503
    
    return NextResponse.json(health, { status })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}