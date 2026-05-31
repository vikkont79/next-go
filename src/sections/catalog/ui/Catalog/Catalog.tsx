import { getAllTrips } from '@/entities/trip/api'
import styles from './Catalog.module.css'
import { CatalogList } from '../CatalogList/CatalogList'
import { ITEMS_PER_PAGE } from '@/shared/config'

interface CatalogPageProps {
  searchParams: Promise<{ page?: string; limit?: string }>
}

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const { page, limit } = await searchParams
  const currentPage = Number(page) || 1
  const currentLimit = Number(limit) || ITEMS_PER_PAGE

  const { trips, totalPages } = await getAllTrips(currentPage, currentLimit)

  if (trips.length === 0) {
    return <div>Пока нет ни одного маршрута</div>
  }
  return (
    <main>
      <h1 className='visually-hidden'>
        Страница поиска попутчиков
      </h1>
      <section className={`${styles.catalog} wrapper`}>
        <h2 className='visually-hidden'>Каталог маршрутов</h2>
        <CatalogList
          trips={trips}
          currentPage={currentPage}
          currentLimit={currentLimit}
          totalPages={totalPages}
        />
      </section>
    </main>
  )
}

export { CatalogPage }
