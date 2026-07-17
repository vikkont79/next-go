import { z } from 'zod'

export const createJoinRequestSchema = z.object({
  tripId: z.uuid()
})
