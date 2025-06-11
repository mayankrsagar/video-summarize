import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('authToken')?.value; // ✅ Correct usage in middleware

  const isPublic = ['/login', '/register'].includes(path);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/history', '/login', '/register'],
};
