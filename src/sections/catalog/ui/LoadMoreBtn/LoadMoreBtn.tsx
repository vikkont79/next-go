'use client'

import { useCreateURL } from "../../lib"
import { Link } from '@/shared/ui';
import { ITEMS_PER_PAGE } from '@/shared/config';

interface LoadMoreBtnProps {
  currentLimit: number;
  className: string;
}

const LoadMoreBtn = ({ className, currentLimit }: LoadMoreBtnProps) => {
  const createURL = useCreateURL()

  return (
    <Link
      className={className}
      href={createURL({ limit: currentLimit + ITEMS_PER_PAGE })}
    >
      Показать ещё
    </Link>
  )
}

export { LoadMoreBtn }
