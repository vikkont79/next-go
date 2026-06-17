'use server'

import { getCurrentUser } from '@/shared/api/get-current-user'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { unlink } from 'fs/promises'
import path from 'path'

export async function deleteUser() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: 'Не авторизован' }

    if (user.avatar && !user.avatar.includes('unknown-raccoon')) {
      const avatarPath = path.join(process.cwd(), 'public', user.avatar)
      await unlink(avatarPath).catch(() => { }) // игнорируем ошибку удаления
    }

    // Удаляем пользователя из БД
    await db.delete(users).where(eq(users.id, user.id))

    // Удаляем токен из cookies
    const cookieStore = await cookies()
    cookieStore.delete('token')

    return { success: true }
  } catch (error) {
    console.error('Delete user error:', error)
    return { error: 'Ошибка удаления пользователя. Попробуйте позже.' }
  }
}
