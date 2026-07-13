'use client'

import { Icon, Link } from '@/shared/ui'
import { useCreateURL } from '../../lib/create-url'
import styles from './Pagination.module.css'


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  activeRange?: { from: number; to: number }
  className?: string;
}

const Pagination = ({ currentPage, totalPages, activeRange, className }: PaginationProps) => {
  const createURL = useCreateURL()

  const getVisiblePages = () => {
    const delta = 2
    const range: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i)
      }
    }

    const result: (number | string)[] = []
    let prev = 0

    for (const page of range) {
      if (typeof page === 'number') {
        if (page - prev > 1) {
          result.push('...')
        }
        result.push(page)
        prev = page
      }
    }

    return result
  }

  const isPageActive = (page: number) => {
    if (activeRange) {
      return page >= activeRange.from && page <= activeRange.to
    }
    return page === currentPage
  }

  return (
    <nav className={`${styles.pagination} ${className}`} aria-label='Пагинация'>
      <div className={styles.pages}>
        {getVisiblePages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className={styles.dots}>...</span>
          ) : (
            <Link
              className={`${styles.pageButton} ${isPageActive(page as number) ? styles.active : ''
                }`}
              key={page}
              href={createURL({ page: page as number })}
            >
              {page}
            </Link>
          )
        )}
      </div>
      {currentPage > 1 && (
        <Link
          className={styles.arrow}
          href={createURL({ page: currentPage - 1 })}
          aria-label='Предыдущая страница'
        >
          <Icon
            name='page-left'
            size={20}
          />
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          className={styles.arrow}
          href={createURL({ page: currentPage + 1 })}
          aria-label='Следующая страница'
        >
          <Icon
            name='page-right'
            size={20}
          />
        </Link>
      )}
    </nav>
  )
}

export { Pagination }
