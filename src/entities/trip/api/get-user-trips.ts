import 'server-only'
import { db } from '../../../../db/client'
import { joinRequests, trips, users } from '../../../../db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { cache } from 'react'
import { JoinRequestStatus } from '@/shared/config'

export const getUserTrips = cache(async (userId: string, currentUserId?: string) => {
  try {
    const result = await db
      .select({
        id: trips.id,
        userId: trips.userId,
        tags: trips.tags,
        transport: trips.transport,
        companions: trips.companions,
        duration: trips.duration,
        hasChildren: trips.hasChildren,
        fromDate: trips.fromDate,
        toDate: trips.toDate,
        countries: trips.countries,
        likes: trips.likes,
        createdAt: trips.createdAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatar: users.avatar,
          level: users.level,
        },
        joinStatus: joinRequests.status,
      })
      .from(trips)
      .innerJoin(users, eq(trips.userId, users.id))
      .leftJoin(joinRequests,
        and(
          eq(joinRequests.tripId, trips.id),
          eq(joinRequests.userId, currentUserId ?? '')
        )
      )
      .where(eq(trips.userId, userId))
      .orderBy(desc(trips.createdAt))

    return result.map(row => ({
      id: row.id,
      userId: row.userId,
      user: row.user!,
      tags: row.tags,
      transport: row.transport,
      companions: row.companions,
      duration: row.duration,
      hasChildren: row.hasChildren === 1,
      dates: {
        from: new Date(row.fromDate),
        to: new Date(row.toDate),
      },
      countries: row.countries,
      likes: row.likes,
      createdAt: new Date(row.createdAt).toISOString(),
      joinStatus: row.joinStatus as JoinRequestStatus ?? 'idle',
    }))
  } catch (error) {
    console.error('Ошибка загрузки маршрутов пользователя', error)
    throw new Error('Ошибка загрузки маршрутов пользователя')
  }
})
