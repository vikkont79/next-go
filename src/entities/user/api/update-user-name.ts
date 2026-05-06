'use server'

import { getCurrentUser } from '@/shared/lib/get-current-user'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { userNameSchema } from '@/shared/lib'

export async function updateUserName(input: unknown) {
  const validation = userNameSchema.safeParse({ name: input })
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { name } = validation.data

  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Не авторизован' }
  }

  await db.update(users)
    .set({ name })
    .where(eq(users.id, user.id))

  revalidatePath('/profile')
  return { success: true, name }
}
