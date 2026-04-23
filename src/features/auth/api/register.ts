'use server'

import bcrypt from 'bcrypt'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { registerSchema } from '@/shared/lib'

export async function register(input: unknown) {
  const result = registerSchema.safeParse(input);
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const { name, email, password } = result.data;

  const existingUser = await db.select().from(users).where(eq(users.email, email))
  if (existingUser.length > 0) {
    return { error: 'Пользователь с таким email уже существует' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await db.insert(users).values({
    id: crypto.randomUUID(),
    name: name,
    email: email,
    passwordHash: hashedPassword,
  }).returning()

  const token = jwt.sign(
    { userId: newUser[0].id, email: newUser[0].email },
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

  const { passwordHash, ...userWithoutPassword } = newUser[0];
  return { success: true, user: userWithoutPassword }
}
