'use server'

import { db } from '../../../db/client'
import { trips } from '../../../db/schema'
import { users } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getTripById = cache(async (id: string) => {
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
    .where(eq(trips.id, id))

  if (result.length === 0) {
    return null
  }

  const row = result[0]

  if (!row.user || !row.user.id) {
    return null
  }

  return {
    id: row.id,
    userId: row.userId,
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
    createdAt: new Date(row.createdAt).toISOString(),
  }
})
