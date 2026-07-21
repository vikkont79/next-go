'use server'

import { getCurrentUser } from '@/shared/api/get-current-user'
import { getUnreadCount } from '@/shared/lib'


export async function getUnreadNotificationsCount() {
  const user = await getCurrentUser()
  if (!user) return { error: 'Не авторизован' }

  try {
    const count = await getUnreadCount(user.id)
    return { success: true, count }
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка получения количества уведомлений' }
  }
}
