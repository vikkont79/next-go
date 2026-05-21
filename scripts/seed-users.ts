import 'dotenv/config'
import { db } from '../db/client'
import { users } from '../db/schema'
import bcrypt from 'bcrypt'
import { fakerRU as faker } from '@faker-js/faker'

const TEST_PASSWORD = '123456'
const USERS_COUNT = 5

async function seedUsers() {
  console.log('🌱 Seeding users...')

  const hashedPassword = await bcrypt.hash(TEST_PASSWORD, 10)

  for (let i = 0; i < USERS_COUNT; i++) {
    const sex = faker.helpers.arrayElement(['female', 'male'])
    const idx = faker.number.int({ min: 0, max: 99 })
    const avatar = `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${sex}/512/${idx}.jpg`
    await db.insert(users).values({
      id: crypto.randomUUID(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      passwordHash: hashedPassword,
      level: faker.number.int({ min: 10, max: 90 }),
      avatar,
    })
  }

  console.log(`✅ Added ${USERS_COUNT} test users`)
  console.log(`🔐 Password for all: ${TEST_PASSWORD}`)
}

seedUsers().catch(console.error)
