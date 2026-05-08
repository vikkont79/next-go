'use server'

import { getCurrentUser } from '@/shared/lib/get-current-user'
import { db } from '../../../../db/client'
import { users } from '../../../../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

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
