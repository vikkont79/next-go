import { db } from '../../../db/client'
import { users } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUserById = cache(async (id: string) => {
  const foundUsers = await db.select().from(users).where(eq(users.id, id))

  if (foundUsers.length === 0) return null

  const user = foundUsers[0]

  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
})
