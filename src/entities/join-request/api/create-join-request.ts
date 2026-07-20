'use server'

import { db } from '../../../../db/client'
import { joinRequests, notifications, trips } from '../../../../db/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { revalidatePath } from 'next/cache'
import { createJoinRequestSchema } from '@/shared/lib'

export async function createJoinRequest(input: unknown) {
  const validation = createJoinRequestSchema.safeParse({ tripId: input })
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { tripId } = validation.data

  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Не авторизован' }
    }

    const trip = await db.select().from(trips).where(eq(trips.id, tripId)).limit(1)
    if (trip.length === 0) {
      return { error: 'Маршрут не найден' }
    }

    if (trip[0].userId === user.id) {
      return { error: 'Вы не можете подать заявку на свой маршрут' }
    }

    const existingRequest = await db
      .select()
      .from(joinRequests)
      .where(
        and(
          eq(joinRequests.tripId, tripId),
          eq(joinRequests.userId, user.id)
        )
      )
      .limit(1)

    if (existingRequest.length > 0) {
      return {
        error: `Вы уже подали заявку на этот маршрут (статус: ${existingRequest[0].status})`
      }
    }

    const result = await db.transaction(async (tx) => {
      const [newRequest] = await tx
        .insert(joinRequests).values({
          id: crypto.randomUUID(),
          tripId,
          userId: user.id,
          status: 'pending',
          message: null,
        }).returning()

      await tx.insert(notifications).values({
        id: crypto.randomUUID(),
        userId: trip[0].userId,
        text: 'К вашему маршруту хотят присоединиться',
        read: false,
      })

      return newRequest
    })

    revalidatePath(`/trips/${tripId}`)
    revalidatePath('/trips')

    return { success: true, request: result }
  } catch (error) {
    console.error(error)
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return { error: 'Вы уже подали заявку на этот маршрут' }
    }
    return { error: 'Не удалось создать заявку. Попробуйте позже.' }
  }
}


