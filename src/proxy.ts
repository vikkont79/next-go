import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const config = {
  matcher: ['/profile/:path*', '/trips/create/:path*'],
};

function redirectHome(request: NextRequest) {
  const url = new URL('/', request.url);
  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Явно логируем/бросаем в dev, но для продакшна безопаснее редирект
    if (process.env.NODE_ENV === 'development') {
      throw new Error('Missing JWT_SECRET');
    }
    return redirectHome(request);
  }

  const token = request.cookies.get('token')?.value;
  if (!token) return redirectHome(request);

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (err) {
    return redirectHome(request);
  }
}
