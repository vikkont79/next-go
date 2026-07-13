import 'server-only'
import { db } from '../../../../db/client'
import { trips, users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getTripById = cache(async (id: string) => {
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
      })
      .from(trips)
      .innerJoin(users, eq(trips.userId, users.id))
      .where(eq(trips.id, id))

    if (result.length === 0) {
      return null
    }

    const row = result[0]

    return {
      id: row.id,
      user: row.user,
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
    }
  } catch (error) {
    console.error('Ошибка загрузки маршрута по id', error)
    throw new Error('Ошибка загрузки маршрута по id')
  }
})
