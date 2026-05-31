'use client'

import { Avatar, Level, Link } from '@/shared/ui'
import type { User } from '@/entities/user'
import styles from './UserInfo.module.css'

interface UserInfoProps {
  user: User;
  className?: string;
  href?: string;
}

const UserInfo = ({ className, user, href }: UserInfoProps) => {
  const avatarSrc = user?.avatar || '/icons/unknown-raccoon.svg'
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Базовая информация о пользователе</h2>
      <Level
        className={styles.level}
        level={user.level}
      />
      <Link href={href}>
        <Avatar
          className={styles.avatar}
          src={avatarSrc}
          alt='Аватар пользователя'
        />
      </Link>
    </section>
  )
}

export { UserInfo }
