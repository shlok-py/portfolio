import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin routes except the login page itself
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSecret = process.env.ADMIN_SECRET;
    const token = request.cookies.get('admin_token');

    if (!adminSecret || !token || token.value !== adminSecret) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
