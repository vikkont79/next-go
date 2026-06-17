'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../../api'
import { useUserStore } from '@/entities/user'
import { IconButton } from '@/shared/ui'


interface LogoutButtonProps {
  className?: string;
}

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const router = useRouter()
  const clearUser = useUserStore((state) => state.clearUser)
  const [error, setError] = useState(false)

  const handleLogout = async () => {
    const result = await logout()
    if (result.error) {
      setError(true)
      return
    }
    clearUser()
    router.refresh()
  }

  return (
    <>
      <IconButton
        className={className}
        icon='exit'
        onClick={handleLogout}
      />
      {
        error && (
          <div style={{ marginInline: '-12px' }} title="Не удалось выйти. Попробуйте позже.">
            ⚠️
          </div>
        )}
    </>
  )
}

export { LogoutButton }
