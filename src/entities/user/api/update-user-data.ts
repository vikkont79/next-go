'use server'

import { getCurrentUser } from '@/shared/lib/get-current-user'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { userNameSchema, emailSchema, passwordSchema } from '@/shared/lib'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'

export async function updateUserName(input: unknown) {
  const validation = userNameSchema.safeParse({ name: input })
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { name } = validation.data

  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Не авторизован' }
  }

  await db.update(users)
    .set({ name })
    .where(eq(users.id, user.id))

  revalidatePath('/profile')
  return { success: true, name }
}

export async function updateAvatar(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Не авторизован' }

  const file = formData.get('avatar') as File
  if (!file) return { error: 'Файл не выбран' }

  if (!file.type.startsWith('image/')) {
    return { error: 'Можно загружать только изображения' }
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'Файл не должен превышать 5 МБ' }
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Уникальное имя файла
  const ext = path.extname(file.name)
  const filename = `${user.id}-${Date.now()}${ext}`
  const uploadDir = path.join(process.cwd(), 'public/uploads/avatars')
  const filepath = path.join(uploadDir, filename)

  // Создаём папку если нет
  await mkdir(uploadDir, { recursive: true })
  await writeFile(filepath, buffer)

  // Относительный путь для БД и img
  const avatarPath = `/uploads/avatars/${filename}`

  // Обновляем БД
  await db.update(users)
    .set({ avatar: avatarPath })
    .where(eq(users.id, user.id))

  revalidatePath('/profile')
  return { success: true, avatar: avatarPath }
}

export async function updateEmail(input: unknown) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Не авторизован' }

  const validation = emailSchema.safeParse({ email: input })
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { email } = validation.data

  // Проверяем, не занят ли email другим пользователем
  const existingUser = await db.select().from(users).where(eq(users.email, email))
  if (existingUser.length > 0 && existingUser[0].id !== user.id) {
    return { error: 'Email уже используется' }
  }

  await db.update(users)
    .set({ email })
    .where(eq(users.id, user.id))

  revalidatePath('/profile')
  return { success: true, email }
}

export async function updatePassword(input: unknown) {
  const user = await getCurrentUser()
  if (!user) return { error: 'Не авторизован' }

  const validation = passwordSchema.safeParse(input)
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { currentPassword, newPassword } = validation.data

  // Проверяем текущий пароль
  const userFromDb = await db.select().from(users).where(eq(users.id, user.id))
  if (!userFromDb[0]) return { error: 'Пользователь не найден' }

  const isPasswordValid = await bcrypt.compare(currentPassword, userFromDb[0].passwordHash)
  if (!isPasswordValid) {
    return { error: 'Неверный текущий пароль' }
  }

  // Хешируем новый пароль
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // Обновляем
  await db.update(users)
    .set({ passwordHash: hashedPassword })
    .where(eq(users.id, user.id))

  revalidatePath('/profile')
  return { success: true }
}
