'use client'

import Image from 'next/image'
import { Level, Button } from '@/shared/ui'
import type { User } from '@/entities/user'
import styles from './UserInfo.module.css'

interface UserInfoProps {
  user?: User | null;
  className?: string;
}

const UserInfo = ({ className, user }: UserInfoProps) => {
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
        height={237}
        onError={(e) => {
          e.currentTarget.src = '/icons/unknown-raccoon.svg';
        }}
      />
      <Button
        className={styles.photoBtn}
        variant='transparent'
        size='large'
      >Сменить фото</Button>
    </section>
  )
}

export { UserInfo }
