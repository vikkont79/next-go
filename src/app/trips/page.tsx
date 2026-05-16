import { CatalogPage } from '@/sections/catalog'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Страница каталога | Next Go',
  }
}

export default function Trips() {
  return (
    <CatalogPage />
  )
}
