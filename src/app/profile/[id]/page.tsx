import { ProfilePage } from '@/sections/profile'
import { getUserById } from '@/entities/user/api'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserById(id)
  return {
    title: user ? `Профиль ${user.name} | Next Go` : `Пользователь не найден | Next Go`,
  }
}

export default async function ProfileById({ params }: PageProps) {
  const { id } = await params
  return <ProfilePage userId={id} />
}
