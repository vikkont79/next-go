'use client'

import { usePathname, useSearchParams } from 'next/navigation'

export const useCreateURL = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, String(value))
    })
    return `${pathname}?${params.toString()}`
  }
}
