'use client'

import { Button } from '@/shared/ui'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import { User } from '@/entities/user'
import styles from './AuthButtons.module.css'

interface AuthButtonsProps {
  className?: string;
  user: User | null;
}

const AuthButtons = ({ className, user }: AuthButtonsProps) => {
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
