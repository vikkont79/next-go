import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const PROTECTED_ROUTES = ['/profile', '/trips/create']
const PUBLIC_ROUTES = ['/', '/trips']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Проверяем, защищён ли маршрут
  const isProtected = PROTECTED_ROUTES.some(route => pathname.startsWith(route))

  // Если не защищён — пропускаем
  if (!isProtected) {
    return NextResponse.next()
  }

  // Достаём токен из cookie
  const token = request.cookies.get('token')?.value

  if (!token) {
    // Нет токена — редирект на главную
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Проверяем валидность токена
  try {
    jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.next()
  } catch (error) {
    // Токен невалиден (просрочен, подделан)
    return NextResponse.redirect(new URL('/', request.url))
  }
}
