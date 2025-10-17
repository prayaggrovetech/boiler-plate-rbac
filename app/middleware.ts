import type { NextRequest } from 'next/server'
import { handleMiddleware } from '@/lib/middleware'

export async function middleware(request: NextRequest) {
  return await handleMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth.js routes)
     * - api/health (health check)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/health).*)',
  ],
}