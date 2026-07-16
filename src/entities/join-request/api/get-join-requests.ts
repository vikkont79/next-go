import 'server-only'
import { db } from '../../../../db/client'
import { joinRequests, trips, users } from '../../../../db/schema'
import { eq, desc } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { JoinRequest } from '../types'

export const getOwnerJoinRequests = async (): Promise<JoinRequest[]> => {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Не авторизован')

    const requests = await db
      .select({
        id: joinRequests.id,
        status: joinRequests.status,
        createdAt: joinRequests.createdAt,
        user: {
          id: users.id,
          name: users.name,
          avatar: users.avatar,
        },
        trip: {
          id: trips.id,
          countries: trips.countries,
          transport: trips.transport,
        },
      })
      .from(joinRequests)
      .innerJoin(trips, eq(joinRequests.tripId, trips.id))
      .innerJoin(users, eq(joinRequests.userId, users.id))
      .where(eq(trips.userId, user.id)) // только маршруты текущего пользователя
      .orderBy(desc(joinRequests.createdAt))

    return requests
  } catch (error) {
    console.error(error)
    throw new Error('Не удалось получить список заявок')
  }
}
