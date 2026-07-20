'use server'

import { getCurrentUser } from '@/shared/api/get-current-user'
import { db } from '../../../../db/client'
import { notifications } from '../../../../db/schema'
import { eq, and, inArray } from 'drizzle-orm'

export async function markNotificationsAsRead(notificationIds: string[]) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Не авторизован' }

  try {
    await db
      .update(notifications)
      .set({ read: true })
      .where(
        and(
          eq(notifications.userId, user.id),
          inArray(notifications.id, notificationIds)
        )
      )

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка обновления уведомлений' }
  }
}
