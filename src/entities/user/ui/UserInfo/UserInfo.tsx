'use client'

import { Avatar, Level, Link } from '@/shared/ui'
import { User, useUserStore } from '@/entities/user'
import styles from './UserInfo.module.css'

interface UserInfoProps {
  targetUser?: User;
  className?: string;
  href?: string;
}

const UserInfo = ({ className, targetUser, href }: UserInfoProps) => {
  const currentUser = useUserStore((state) => state.user)
  const user = targetUser ? targetUser : currentUser
  if (!user) return null
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
