'use server'

import { cookies } from 'next/headers'

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return { success: true }
  } catch (error) {
    return { error: 'Ошибка сервера при выходе' }
  }
}
