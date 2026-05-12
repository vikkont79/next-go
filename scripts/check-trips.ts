import 'dotenv/config'
import { db } from '../db/client'
import { trips } from '../db/schema'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

async function checkTrips() {
  const allTrips = await db.select().from(trips)
  console.log(`📊 Total trips: ${allTrips.length}`)

  if (allTrips.length === 0) {
    console.log('No trips found')
    return
  }

  // первые 3 трипа с именами пользователей
  const tripsWithUsers = await Promise.all(
    allTrips.slice(0, 10).map(async (trip) => {
      const user = await db.select().from(users).where(eq(users.id, trip.userId))
      return {
        id: trip.id,
        user: user[0]?.name || 'Unknown',
        countries: trip.countries,
        dates: `${trip.fromDate} → ${trip.toDate}`
      }
    })
  )

  console.log('📋 Sample trips:', tripsWithUsers)
}

checkTrips()
