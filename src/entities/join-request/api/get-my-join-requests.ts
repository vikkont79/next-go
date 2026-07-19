import 'server-only'
import { db } from '../../../../db/client'
import { joinRequests, trips, users } from '../../../../db/schema'
import { eq, desc } from 'drizzle-orm'
import { Trip } from '@/entities/trip'
import { JoinRequestStatus } from '@/shared/config'
import { User } from '@/entities/user'
import { cache } from 'react'

export const getUserJoinRequests = cache(async (user: User): Promise<Trip[]> => {
  try {
    const rows = await db
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
        joinStatus: joinRequests.status,
        owner: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatar: users.avatar,
          level: users.level,
        },
      })
      .from(joinRequests)
      .innerJoin(trips, eq(joinRequests.tripId, trips.id))
      .innerJoin(users, eq(trips.userId, users.id))
      .where(eq(joinRequests.userId, user.id))
      .orderBy(desc(joinRequests.createdAt))

    return rows.map((row) => ({
      id: row.id,
      userId: row.userId,
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
      user: {
        id: row.owner.id,
        name: row.owner.name,
        email: row.owner.email,
        avatar: row.owner.avatar,
        level: row.owner.level,
      },
      joinStatus: row.joinStatus as JoinRequestStatus,
    }))
  } catch (error) {
    console.error(error)
    throw new Error('Не удалось получить список исходящих заявок')
  }
})
