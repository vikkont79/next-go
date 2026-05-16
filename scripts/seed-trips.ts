import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'
import { trips } from '../db/schema'
import { faker } from '@faker-js/faker'
import { TRANSPORT_OPTIONS, countries } from '@/shared/config'


const TRIPS_PER_USER = 2

async function seedTrips() {
  console.log('🌍 Seeding trips...')

  const allUsers = await db.select().from(users)
  if (allUsers.length === 0) {
    console.warn('⚠️ No users found. Run seed-users.ts first.')
    return
  }

  const allTrips = []

  for (const user of allUsers) {
    for (let i = 0; i < TRIPS_PER_USER; i++) {
      const fromDate = faker.date.future()
      const toDate = new Date(fromDate)
      toDate.setDate(fromDate.getDate() + faker.number.int({ min: 2, max: 14 }))

      allTrips.push({
        id: crypto.randomUUID(),
        userId: user.id,
        tags: `#${faker.lorem.word()} #${faker.lorem.word()}`,
        transport: faker.helpers.arrayElements(TRANSPORT_OPTIONS, { min: 1, max: 3 }),
        companions: faker.number.int({ min: 0, max: 5 }),
        duration: Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)),
        fromDate,
        toDate,
        countries: faker.helpers.arrayElements(countries, { min: 1, max: 4 }).map(country => ({
          code: country.code,
          plan: faker.lorem.sentence()
        })),
        likes: faker.number.int({ min: 0, max: 50 }),
        createdAt: faker.date.recent(),
      })
    }
  }

  await db.insert(trips).values(allTrips)  // один запрос

  console.log(`✅ Added ${allTrips.length} trips (${TRIPS_PER_USER} per user)`)
}

seedTrips().catch(console.error)
