'use client'

import { Button } from '@/shared/ui'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { useUserStore } from '@/entities/user'
import styles from './AuthButtons.module.css'

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons = ({ className }: AuthButtonsProps) => {
  const user = useUserStore((state) => state.user)
  return (
    <div className={className}>
      {user ? (
        <LogoutButton className={styles.authBtn} />
      ) : (
        <Button
          className={styles.authBtn}
          commandfor='auth-modal'
          command='show-modal'>
          Войти
        </Button>
      )
      }
    </div>
  )
}

export { AuthButtons }
