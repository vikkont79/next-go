import 'dotenv/config'
import { db } from '../db/client'
import { trips } from '../db/schema'

async function clearTrips() {
  await db.delete(trips)
  console.log('✅ All trips deleted')
}

clearTrips()
