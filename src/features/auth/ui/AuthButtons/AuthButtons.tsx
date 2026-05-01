'use client'

import { Button, IconButton } from '@/shared/ui'
import { LogoutButton } from '../LogoutButton/LogoutButton'
import Image from 'next/image'
import { User } from '@/entities/user'
import styles from './AuthButtons.module.css'
import { useEffect, useRef, useState } from 'react'

interface AuthButtonsProps {
  className?: string;
  user: User | null;
}

const AuthButtons = ({ className, user }: AuthButtonsProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const avatarSrc = user?.avatar || '/icons/unknown-raccoon.svg'
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])
  const handleAvatarClick = () => {
    setShowMenu(true)
  }

  if (!user) {
    return (
      <div className={className}>
        <IconButton
          className={styles.authBtn}
          icon='enter'
          commandfor='auth-modal'
          command='show-modal'>
        </IconButton>
      </div>
    )
  }
  return (
    <>
      {!showMenu ? (
        <Button
          className={styles.avatarBtn}
          onClick={handleAvatarClick}
          aria-label="Открыть меню пользователя"
        >
          <Image
            className={styles.avatar}
            src={avatarSrc}
            alt='Аватар попутчика'
            width={220}
            height={220}
            onError={(e) => {
              e.currentTarget.src = '/icons/unknown-raccoon.svg';
            }}
          />
        </Button>
      ) : (
        <div className={styles.userMenu} ref={menuRef}>
          <IconButton
            className={styles.authBtn}
            icon='profile'
            iconSizeMob={16}
            href='/profile'
          />
          <LogoutButton className={styles.authBtn} />
        </div>
      )}
    </>)
}

export { AuthButtons }
