import 'server-only'
import { db } from '../../../../db/client'
import { joinRequests } from '../../../../db/schema'
import { eq, and } from 'drizzle-orm'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { JoinRequestStatus } from '@/shared/config'

export const getUserJoinRequestStatus = async (tripId: string): Promise<JoinRequestStatus> => {
  try {
    const user = await getCurrentUser()
    if (!user) return 'idle'

    const [request] = await db
      .select({ status: joinRequests.status })
      .from(joinRequests)
      .where(
        and(
          eq(joinRequests.tripId, tripId),
          eq(joinRequests.userId, user.id)
        )
      )
      .limit(1)

    return request?.status ?? 'idle'
  } catch (error) {
    console.error(error)
    throw new Error('Не удалось получить статус заявки')
  }
}
