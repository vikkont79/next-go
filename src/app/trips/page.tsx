import { CatalogPage } from '@/sections/catalog'
import { Metadata } from 'next'

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Страница каталога | Next Go',
  }
}

export default function Trips({ searchParams }: PageProps) {
  return (
    <CatalogPage
      searchParams={searchParams}
    />
  )
}
