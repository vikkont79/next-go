'use server'

import { db } from '../../../../db/client'
import { joinRequests, trips } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { revalidatePath } from 'next/cache'

export async function approveJoinRequest(requestId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: 'Не авторизован' }

    // Проверяем, что заявка существует и принадлежит маршруту текущего пользователя
    const [request] = await db
      .select({
        tripId: joinRequests.tripId,
        tripOwnerId: trips.userId,
      })
      .from(joinRequests)
      .innerJoin(trips, eq(joinRequests.tripId, trips.id))
      .where(eq(joinRequests.id, requestId))
      .limit(1)

    if (!request) return { error: 'Заявка не найдена' }
    if (request.tripOwnerId !== user.id) return { error: 'Нет прав на подтверждение' }

    await db
      .update(joinRequests)
      .set({ status: 'approved' })
      .where(eq(joinRequests.id, requestId))

    revalidatePath('/profile')
    revalidatePath(`/trips/${request.tripId}`)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: 'Не удалось подтвердить заявку' }
  }
}
