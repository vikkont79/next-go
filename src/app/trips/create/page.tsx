import { CreateTripPage } from '@/sections/create-trip'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Страница создания маршрута | Next Go',
  }
}

export default function CreateTrip() {
  return (
    <CreateTripPage />
  )
}
