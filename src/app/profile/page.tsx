import { ProfilePage } from '@/sections/profile'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  let userName

  try {
    const user = await getCurrentUser()
    userName = user?.name ?? null
  } catch (error) {
    userName = null
    console.error('Failed to fetch user for metadata:', error)
  }

  return {
    title: userName ? `Профиль ${userName} | Next Go` : 'Профиль | Next Go',
  }
}

export default async function Profile() {
  return (
    <ProfilePage />
  )
}
