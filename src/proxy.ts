import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const config = {
  matcher: ['/profile/:path*', '/trips/:path'],
};

function redirectAuth(request: NextRequest) {
  const url = new URL('/', request.url)
  url.searchParams.set('auth', 'open')
  return NextResponse.redirect(url)
}

export function proxy(request: NextRequest) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error('JWT_SECRET is not set')
    return redirectAuth(request)
  }

  const token = request.cookies.get('token')?.value
  if (!token) return redirectAuth(request)

  try {
    jwt.verify(token, secret)
    return NextResponse.next()
  } catch (err) {
    console.error('Invalid token:', err)
    return redirectAuth(request)
  }
}
