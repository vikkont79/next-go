import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Минимум 2 символа' }),
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(6, { message: 'Минимум 6 символов' }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  password: z.string().min(6, { message: 'Введите пароль' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
