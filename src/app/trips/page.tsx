import { CatalogPage } from '@/sections/catalog'
import { getAllTrips } from '@/shared/lib/get-all-trips'
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
