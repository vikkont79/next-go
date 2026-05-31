import 'dotenv/config'
import { db } from '../db/client'
import { trips } from '../db/schema'
import { eq } from 'drizzle-orm'

async function deleteBadTrip() {
  await db.delete(trips).where(eq(trips.id, '0d55b9a3-960d-450a-a8bb-b0862e6bc835'))
  console.log('✅ Bad trip deleted')
}

deleteBadTrip()
