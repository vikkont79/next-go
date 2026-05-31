import 'dotenv/config'
import { db } from '../db/client'
import { sql } from 'drizzle-orm'

async function setupTriggers() {
  console.log('📦 Creating triggers...')

  await db.run(sql`
    CREATE TRIGGER IF NOT EXISTS update_users_updated_at
    AFTER UPDATE ON users
    BEGIN
      UPDATE users SET updated_at = unixepoch() WHERE id = NEW.id;
    END;
  `)

  console.log('✅ Triggers created successfully')
}

setupTriggers()
