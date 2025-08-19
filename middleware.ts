import { COOKIE_CONFIG } from '@/constant/cookie.constant';
import { getCookie } from '@/service/cookie';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
 const token = getCookie(COOKIE_CONFIG.access);
 const publicRoutes = ['/', '/login', '/futsals'];

 if (publicRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
  if (!token) {
   // Redirect to login if no token
   return NextResponse.redirect(new URL('/login', request.url));
  }
 }

 return NextResponse.next(); // allow access if authenticated or public route
}

// Apply middleware only to specific routes (optional)
export const config = {
 matcher: ['/:path*'],
};
