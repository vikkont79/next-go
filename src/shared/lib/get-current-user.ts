import 'server-only'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { db } from '../../../db/client'
import { users } from '../../../db/schema'
import { eq } from 'drizzle-orm'

interface JWTPayload {
  userId: string;
  email: string;
}

export async function getCurrentUser() {
  // 1. Получаем cookie
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  // 2. Проверяем JWT
  let payload: JWTPayload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
  } catch (error) {
    // Токен невалиден (просрочен, подделан и т.д.)
    return null
  }

  // 3. Ищем пользователя в БД
  const foundUsers = await db.select().from(users).where(eq(users.id, payload.userId))
  if (foundUsers.length === 0) {
    return null
  }

  const user = foundUsers[0]

  // 4. Возвращаем без пароля
  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}
