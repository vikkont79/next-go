import { ProfilePage } from '@/sections/profile'
import { getCurrentUser } from '@/shared/lib/get-current-user'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser()
  return {
    title: user ? `Профиль ${user.name} | Next Go` : 'Профиль | Next Go',
  }
}

export default async function Profile() {
  return (
    <ProfilePage />
  )
}
