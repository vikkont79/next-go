import { ProfilePage } from '@/sections/profile'
import { getUserById } from '@/entities/user/api/get-user-by-id'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  let userName: string | null = null

  try {
    const user = await getUserById(id)
    if (user && !('error' in user)) {
      userName = user.name
    }
  } catch (error) {
    console.error(`Failed to fetch user for metadata (id: ${id}):`, error)
  }

  return {
    title: userName ? `Профиль ${userName} | Next Go` : 'Пользователь не найден | Next Go',
  }
}

export default async function ProfileById({ params }: PageProps) {
  const { id } = await params
  return <ProfilePage userId={id} />
}
