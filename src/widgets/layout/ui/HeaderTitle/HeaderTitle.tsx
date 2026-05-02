'use client'

import { usePathname } from 'next/navigation'
import { getRouteConfig } from '@/shared/lib/get-route-config'
import styles from './HeaderTitle.module.css'

const HeaderTitle = () => {
  const pathname = usePathname()
  const routeConfig = getRouteConfig(pathname)
  return (
    routeConfig.headerTitle && (
      <span className={styles.title}>{routeConfig.headerTitle}</span>
    )
  )
}

export { HeaderTitle }
