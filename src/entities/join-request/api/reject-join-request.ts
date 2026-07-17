// entities/join-request/api/reject-join-request.ts
'use server'

import { db } from '../../../../db/client'
import { joinRequests, trips } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { revalidatePath } from 'next/cache'

export async function rejectJoinRequest(requestId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Не авторизован')

    const [request] = await db
      .select({
        tripId: joinRequests.tripId,
        tripOwnerId: trips.userId,
      })
      .from(joinRequests)
      .innerJoin(trips, eq(joinRequests.tripId, trips.id))
      .where(eq(joinRequests.id, requestId))
      .limit(1)

    if (!request) throw new Error('Заявка не найдена')
    if (request.tripOwnerId !== user.id) throw new Error('Нет прав на отклонение')

    await db
      .update(joinRequests)
      .set({ status: 'rejected' })
      .where(eq(joinRequests.id, requestId))

    revalidatePath('/profile')
    revalidatePath(`/trips/${request.tripId}`)

    return { success: true }
  } catch (error) {
    console.error(error)
    throw new Error('Не удалось отклонить заявку')
  }
}
