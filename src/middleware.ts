import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname and search params
  const { pathname, search } = request.nextUrl
  
  // If there are query parameters (like ?ref=blog.kitpro.us), redirect to clean URL
  if (search && search.length > 0) {
    const cleanUrl = new URL(pathname, request.url)
    return NextResponse.redirect(cleanUrl, 301) // Permanent redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
