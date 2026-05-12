import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'

async function clearUsers() {
  await db.delete(users)
  console.log('✅ Users deleted')
}

clearUsers()
