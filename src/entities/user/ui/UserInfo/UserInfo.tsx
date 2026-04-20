import Image from 'next/image'
import { Level } from '@/shared/ui'
import styles from './UserInfo.module.css'
import type { User } from '@/entities/user'

interface UserInfoProps {
  user: User;
  className?: string;
}

const UserInfo = ({ user, className = '' }: UserInfoProps) => {
  return (
    <section className={`${styles.user} ${className}`}>
      <h2 className='visually-hidden'>Информация о пользователе</h2>
      <Level
        className={styles.level}
        level={user.level}
      />
      <Image
        className={styles.avatar}
        src={user.avatar}
        alt='Аватар попутчика'
        width={60}
        height={60}
      />
    </section>
  )
}

export { UserInfo }
