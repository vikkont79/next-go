'use client'

import { useRouter } from 'next/navigation'
import { logout } from '../../api'
import { useUserStore } from '@/entities/user'
import { IconButton } from '@/shared/ui'


interface LogoutButtonProps {
  className?: string;
  children?: string;
}

const LogoutButton = ({ className, children }: LogoutButtonProps) => {
  const router = useRouter()
  const clearUser = useUserStore((state) => state.clearUser)

  const handleLogout = async () => {
    await logout()
    clearUser()
    router.refresh()
  }

  return (
    <IconButton
      className={className}
      icon='exit'
      onClick={handleLogout}
    >
      {children}
    </IconButton>
  )
}

export { LogoutButton }
