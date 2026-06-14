import 'server-only'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { db } from '../../../db/client'
import { users } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

interface JWTPayload {
  userId: string;
  email: string;
}

export const getCurrentUser = cache(async () => {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    let payload: JWTPayload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    } catch (error) {
      // Токен невалиден (просрочен, подделан и т.д.)
      return null
    }

    const foundUsers = await db.select().from(users).where(eq(users.id, payload.userId))

    if (foundUsers.length === 0) return null

    const user = foundUsers[0]

    const { passwordHash, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error('Ошибка загрузки авторизованного пользователя', error)
    throw new Error('Ошибка загрузки авторизованного пользователя')
  }
})
