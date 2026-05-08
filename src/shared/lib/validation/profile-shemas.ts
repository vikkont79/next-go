import { z } from 'zod'

export const userNameSchema = z.object({
  name: z.string().min(2, { message: 'Минимум 2 символа' }),
})

export const emailSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
})

export const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Минимум 6 символов'),
  newPassword: z.string().min(6, 'Минимум 6 символов'),
  confirmPassword: z.string().min(6, 'Минимум 6 символов'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

export type UserNameInput = z.infer<typeof userNameSchema>
export type EmailInput = z.infer<typeof emailSchema>
export type PasswordInput = z.infer<typeof passwordSchema>
