import { Trip } from '@/entities/trip'
import { Pagination } from '../Pagination/Pagination'
import { ITEMS_PER_PAGE } from '@/shared/config'
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn'
import { TripCard } from '@/widgets/trip-card'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  trips: Trip[];
  currentPage: number;
  currentLimit: number;
  totalPages: number;
}

const CatalogList = ({
  trips,
  currentPage,
  currentLimit,
  totalPages,
}: CatalogListProps) => {
  const canLoadMore = currentLimit < totalPages * ITEMS_PER_PAGE && trips.length >= currentLimit

  const activeRange = {
    from: currentPage,
    to: Math.min(
      currentPage + Math.floor((currentLimit - ITEMS_PER_PAGE) / ITEMS_PER_PAGE),
      totalPages
    )
  }

  return (
    <div className={styles.list}>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
      {canLoadMore && (
        <LoadMoreBtn
          className={styles.loadMore}
          currentLimit={currentLimit} />
      )}
      {totalPages > 1 && (
        <Pagination
          className={styles.pagination}
          currentPage={currentPage}
          totalPages={totalPages}
          activeRange={activeRange}
        />
      )}
    </div>
  )
}

export { CatalogList }
