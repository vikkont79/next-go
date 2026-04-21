'use server'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { loginSchema } from '@/shared/lib'

interface LoginInput {
  email: string;
  password: string;
}

export async function login(input: unknown) {
  const result = loginSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { email, password } = result.data;

  const foundUsers = await db.select().from(users).where(eq(users.email, email))
  if (foundUsers.length === 0) {
    return { error: 'Неверный email' }
  }

  const user = foundUsers[0]

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatch) {
    return { error: 'Неверный пароль' }
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  const { passwordHash, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword }
}
