import 'server-only'
import { db } from '../../../../db/client'
import { joinRequests, trips, users } from '../../../../db/schema'
import { eq, desc, sql, and } from 'drizzle-orm'
import { cache } from 'react'
import { ITEMS_PER_PAGE, JoinRequestStatus } from '@/shared/config'

export const getAllTrips = cache(async (
  page: number = 1,
  limit: number = ITEMS_PER_PAGE,
  userId?: string,
) => {
  const offset = (page - 1) * ITEMS_PER_PAGE

  try {
    const result = await db
      .select({
        id: trips.id,
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
          eq(joinRequests.userId, userId ?? '')
        )
      )
      .orderBy(desc(trips.createdAt))
      .offset(offset)
      .limit(limit)

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(trips)
      .where(
        sql`EXISTS (SELECT 1 FROM ${users} WHERE ${users.id} = ${trips.userId})`
      )

    const totalTrips = totalResult[0]?.count ?? 0
    const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE)

    const validTrips = result.map((row) => ({
      id: row.id,
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

    return {
      trips: validTrips,
      totalPages,
    }
  } catch (error) {
    console.error('Ошибка загрузки маршрутов', error)
    throw new Error('Ошибка загрузки маршрутов')
  }
})
