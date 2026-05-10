import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'
import { sql } from 'drizzle-orm'

async function clearAvatars() {
  console.log('Clearing avatars...')

  await db.update(users)
    .set({ avatar: sql`NULL` })

  console.log('✅ All avatars cleared')
  process.exit(0)
}

clearAvatars().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
