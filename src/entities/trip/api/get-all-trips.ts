'use server'

import { db } from '../../../../db/client'
import { trips, users } from '../../../../db/schema'
import { eq, desc, sql } from 'drizzle-orm'
import { cache } from 'react'
import { ITEMS_PER_PAGE } from '../../../shared/config'

export const getAllTrips = cache(async (page: number = 1, limit: number = ITEMS_PER_PAGE) => {
  const offset = (page - 1) * ITEMS_PER_PAGE

  const result = await db
    .select({
      id: trips.id,
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
    .innerJoin(users, eq(trips.userId, users.id))
    .orderBy(desc(trips.createdAt))
    .offset(offset)
    .limit(limit)

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(trips)
    .innerJoin(users, eq(trips.userId, users.id))

  const totalTrips = totalResult[0]?.count ?? 0
  const totalPages = Math.ceil(totalTrips / ITEMS_PER_PAGE)

  const validTrips = result.map((row) => ({
    id: row.id,
    user: row.user!,
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
    createdAt: new Date(row.createdAt).toISOString(),

  }))

  return {
    trips: validTrips,
    totalPages,
  }
})
