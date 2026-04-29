'use client'

import { useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const AuthModalOpener = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    const shouldOpen = searchParams.get('auth') === 'open'
    console.log('shouldOpen:', shouldOpen, 'param:', searchParams.get('auth'))
    if (shouldOpen && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true
      const loginButton = document.querySelector('[command="show-modal"]')
        ; (loginButton as HTMLButtonElement)?.click()
      window.history.replaceState({}, '', pathname)
    }
  }, [searchParams, pathname])

  return null
}

export { AuthModalOpener }
