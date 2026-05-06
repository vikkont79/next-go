import { z } from 'zod'

export const userNameSchema = z.object({
  name: z.string().min(2, { message: 'Минимум 2 символа' }),
})

export type UserNameInput = z.infer<typeof userNameSchema>
