'use client'
import Image from 'next/image'
import { Level } from '@/shared/ui'
import styles from './UserInfo.module.css'
import type { User } from '@/entities/user'

interface UserInfoProps {
  user?: User | null;
  className?: string;
}

const UserInfo = ({ user, className = '' }: UserInfoProps) => {
  const avatarSrc = user?.avatar || '/icons/unknown-raccoon.svg'
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Информация о пользователе</h2>
      {user &&
        <Level
          className={styles.level}
          level={user.level}
        />
      }
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
    </section>
  )
}

export { UserInfo }
