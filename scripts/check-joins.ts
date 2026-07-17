import 'dotenv/config'
import { db } from '../db/client'
import { joinRequests } from '../db/schema'

async function check() {
  const all = await db.select().from(joinRequests)
  console.log(JSON.stringify(all, null, 2))
}

check()
