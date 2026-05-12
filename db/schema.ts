import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import type { TransportType, TripCountry } from '@/entities/trip/types/trip'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  avatar: text('avatar'),
  level: integer('level').notNull().default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
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
  fromDate: integer('from_date', { mode: 'timestamp' }).notNull(),
  toDate: integer('to_date', { mode: 'timestamp' }).notNull(),
  countries: text('countries', { mode: 'json' }).$type<TripCountry[]>().notNull(),
  likes: integer('likes').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
