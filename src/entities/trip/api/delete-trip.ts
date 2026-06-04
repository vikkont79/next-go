'use server'

import { db } from '../../../../db/client'
import { trips } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTrip(tripId: string) {
  try {
    // 1. Проверка авторизации
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Необходимо авторизоваться' }
    }

    // 2. Получаем трип
    const trip = await db.select().from(trips).where(eq(trips.id, tripId)).limit(1)
    if (!trip.length) {
      return { error: 'Маршрут не найден' }
    }

    // 3. Проверка прав (только владелец)
    if (trip[0].userId !== user.id) {
      return { error: 'У вас нет прав на удаление этого маршрута' }
    }


    await db.delete(trips).where(eq(trips.id, tripId))
    revalidatePath('/trips')
    revalidatePath(`/trips/${tripId}`)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Не удалось удалить маршрут' }
  }
}
