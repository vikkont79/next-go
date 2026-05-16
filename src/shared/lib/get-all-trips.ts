'use server'

import { Trip } from '@/entities/trip/types/trip'
import { db } from '../../../db/client'
import { trips } from '../../../db/schema'
import { users } from '../../../db/schema'
import { eq, desc } from 'drizzle-orm'
import { cache } from 'react'

export const getAllTrips = cache(async () => {
  const result = await db
    .select({
      id: trips.id,
      userId: trips.userId,
      tags: trips.tags,
      transport: trips.transport,
      companions: trips.companions,
      duration: trips.duration,
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
    .leftJoin(users, eq(trips.userId, users.id))
    .orderBy(desc(trips.createdAt)) // свежие сверху

  // Преобразуем результат в тип Trip[]
  return result.map((row) => {
    // Пропускаем трипы без автора (битые данные)
    if (!row.user || !row.user.id) {
      return null
    }

    return {
      id: row.id,
      user: row.user,
      tags: row.tags,
      transport: row.transport,
      companions: row.companions,
      duration: row.duration,
      dates: {
        from: new Date(row.fromDate),
        to: new Date(row.toDate),
      },
      countries: row.countries,
      likes: row.likes,
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : new Date().toISOString(),
    }
  }).filter((trip): trip is Trip => trip !== null)
})
