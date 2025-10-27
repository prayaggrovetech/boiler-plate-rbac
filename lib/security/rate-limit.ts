import { NextRequest } from "next/server"

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimiter {
  private store: RateLimitStore = {}
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  private getKey(request: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(request)
    }
    
    // Default key generation based on IP
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
    return `rate_limit:${ip}`
  }

  private cleanup(): void {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime <= now) {
        delete this.store[key]
      }
    })
  }

  public isAllowed(request: NextRequest): { allowed: boolean; remaining: number; resetTime: number } {
    this.cleanup()
    
    const key = this.getKey(request)
    const now = Date.now()
    const resetTime = now + this.config.windowMs

    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetTime
      }
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime
      }
    }

    const record = this.store[key]
    
    if (record.resetTime <= now) {
      // Reset the window
      record.count = 1
      record.resetTime = resetTime
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime
      }
    }

    if (record.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime
      }
    }

    record.count++
    return {
      allowed: true,
      remaining: this.config.maxRequests - record.count,
      resetTime: record.resetTime
    }
  }
}

// Pre-configured rate limiters
export const authRateLimit = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 50, // 50 attempts per 15 minutes (increased for development)
  keyGenerator: (request) => {
    const email = request.headers.get('x-user-email') || 'unknown'
    return `auth_rate_limit:${email}`
  }
})

export const apiRateLimit = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100 // 100 requests per minute
})

export const strictApiRateLimit = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10 // 10 requests per minute for sensitive endpoints
})

// Helper function to create rate limit response headers
export function createRateLimitHeaders(result: { remaining: number; resetTime: number }) {
  return {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
    'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString()
  }
}