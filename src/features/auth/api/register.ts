'use server'

import bcrypt from 'bcrypt'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { registerSchema } from '@/shared/lib'

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

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

  const { passwordHash, ...userWithoutPassword } = newUser[0];
  return { success: true, user: userWithoutPassword }
}
