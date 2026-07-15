import 'dotenv/config'
import { db } from '../db/client'
import { joinRequests } from '../db/schema'

async function clearJoinRequests() {
  await db.delete(joinRequests)
  console.log('✅ All join requests deleted')
}

clearJoinRequests()
