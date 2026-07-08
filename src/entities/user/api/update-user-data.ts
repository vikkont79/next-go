'use server'

import { put, del } from '@vercel/blob'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { userNameSchema, emailSchema, passwordSchema } from '@/shared/lib'
import bcrypt from 'bcrypt'

export async function updateUserName(input: unknown) {
  const validation = userNameSchema.safeParse({ name: input })
  if (!validation.success) {
    return { error: validation.error.issues[0].message }
  }

  const { name } = validation.data

  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Не авторизован' }
    }

    await db.update(users)
      .set({ name })
      .where(eq(users.id, user.id))

    revalidatePath('/profile')
    return { success: true, name }
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка сервера. Попробуйте позже.' }
  }
}

export async function updateAvatar(formData: FormData) {
  try {
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

    const blob = await put(
      `avatars/${user.id}-${Date.now()}.jpeg`,
      file,
      {
        access: 'public',
        contentType: file.type,
      }
    )

    // Удаляем старый аватар (если он есть и это Vercel Blob URL)
    if (user.avatar && user.avatar.startsWith('https://')) {
      await del(user.avatar).catch(() => { }) // игнорируем ошибку
    }

    await db.update(users)
      .set({ avatar: blob.url })
      .where(eq(users.id, user.id))

    revalidatePath('/profile')
    return { success: true, avatar: blob.url }
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка сервера. Попробуйте позже.' }
  }
}

export async function updateEmail(input: unknown) {
  try {
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
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка сервера. Попробуйте позже.' }
  }
}

export async function updatePassword(input: unknown) {
  try {
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
  } catch (error) {
    console.error(error)
    return { error: 'Ошибка сервера. Попробуйте позже.' }
  }
}
