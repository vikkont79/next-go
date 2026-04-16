import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'

async function seed() {
  console.log('🌱 Clearing users...')
  await db.delete(users)

  console.log('🌱 Seeding users...')
  await db.insert(users).values([
    {
      id: '1',
      name: 'Анна Иванова',
      email: 'anna@example.com',
      passwordHash: 'hash_будет_потом',
      avatar: 'https://i.pravatar.cc/150',
      level: 5,
      likes: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Борис Петров',
      email: 'boris@example.com',
      passwordHash: 'hash_будет_потом',
      avatar: 'https://i.pravatar.cc/150',
      level: 2,
      likes: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  console.log('✅ Users seeded')
}

seed().catch(console.error)
