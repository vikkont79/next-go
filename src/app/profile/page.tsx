import { ProfilePage } from '@/sections/profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Профиль | Next Go',
}

export default async function Profile() {
  return (
    <ProfilePage />
  )
}
