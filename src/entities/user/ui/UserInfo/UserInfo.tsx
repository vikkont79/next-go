'use client'

import { Avatar, Level } from '@/shared/ui'
import type { User } from '@/entities/user'
import styles from './UserInfo.module.css'

interface UserInfoProps {
  user: User;
  className?: string;
}

const UserInfo = ({ className, user }: UserInfoProps) => {
  const avatarSrc = user?.avatar || '/icons/unknown-raccoon.svg'
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Базовая информация о пользователе</h2>
      <Level
        className={styles.level}
        level={user.level}
      />
      <Avatar
        className={styles.avatar}
        src={avatarSrc}
        alt='Аватар пользователя'
      />
    </section>
  )
}

export { UserInfo }
