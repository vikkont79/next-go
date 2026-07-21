'use server'

import { getCurrentUser } from '@/shared/api/get-current-user'
import { db } from '../../../../db/client'
import { notifications } from '../../../../db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { resetUnreadCount } from '@/shared/lib'

export async function getUnreadNotifications() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: 'Не авторизован' }

    await resetUnreadCount(user.id)

    const unread = await db
      .select()
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, user.id),
          eq(notifications.read, false)
        )
      )
      .orderBy(desc(notifications.createdAt))

    return { success: true, notifications: unread }
  } catch (error) {
    console.error(error)
    return { error: 'Не удалось получить уведомления' }
  }
}
