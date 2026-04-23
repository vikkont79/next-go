'use client'

import { useRouter } from 'next/navigation'
import { logout } from '../../api'
import { useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui'

const LogoutButton = () => {
  const router = useRouter()
  const clearUser = useUserStore((state) => state.clearUser)

  const handleLogout = async () => {
    await logout()
    clearUser()
    router.refresh()
  }

  return (
    <Button onClick={handleLogout}>
      Выйти
    </Button>
  )
}

export { LogoutButton }
