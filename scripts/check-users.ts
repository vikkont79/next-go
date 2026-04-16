import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'

async function check() {
  const allUsers = await db.select().from(users)
  console.log(JSON.stringify(allUsers, null, 2))
}

check()
