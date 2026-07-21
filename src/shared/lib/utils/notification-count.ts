import { redis } from '../../../../redis/client'

const KEY_PREFIX = 'notifications:unread:'

export async function incrementUnreadCount(userId: string) {
  await redis.incr(`${KEY_PREFIX}${userId}`)
}

export async function resetUnreadCount(userId: string) {
  await redis.set(`${KEY_PREFIX}${userId}`, 0)
}

export async function getUnreadCount(userId: string): Promise<number> {
  const count = await redis.get<number>(`${KEY_PREFIX}${userId}`)
  return count ?? 0
}
