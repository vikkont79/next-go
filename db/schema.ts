import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import type { TransportType, TripCountry } from '@/entities/trip/types/trip'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  avatar: text('avatar'),
  level: integer('level').notNull().default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const trips = sqliteTable('trips', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  tags: text('tags').notNull(),
  transport: text('transport', { mode: 'json' }).$type<TransportType[]>().notNull(),
  companions: integer('companions').notNull(),
  duration: integer('duration').notNull(),
  hasChildren: integer('has_children').notNull().default(0),
  fromDate: integer('from_date', { mode: 'timestamp' }).notNull(),
  toDate: integer('to_date', { mode: 'timestamp' }).notNull(),
  countries: text('countries', { mode: 'json' }).$type<TripCountry[]>().notNull(),
  likes: integer('likes').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const joinRequests = sqliteTable('join_requests', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  tripId: text('trip_id')
    .notNull()
    .references(() => trips.id, { onDelete: 'cascade' }),

  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  status: text('status').$type<'pending' | 'approved' | 'rejected'>().notNull().default('pending'),

  message: text('message'),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),

  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
}, (table) => [
  uniqueIndex('unique_trip_user').on(table.tripId, table.userId)
])

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),

  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  text: text('text').notNull(),

  read: integer('read', { mode: 'boolean' }).notNull().default(false),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})
