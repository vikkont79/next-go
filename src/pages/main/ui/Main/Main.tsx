import Image from 'next/image'
import { UserInfo } from '@/entities/user/ui'
import bgMob from '@/shared/assets/images/bg-mob.png'
import bgTab from '@/shared/assets/images/bg-tablet.png'
import bg from '@/shared/assets/images/bg-desktop.png'
import styles from './Main.module.css'

const MainPage = () => {
  const mockUser = {
    id: '1',
    name: 'Анна Иванова',
    avatar: '/icons/unknown-raccoon.svg',
    level: 87,
    likes: 42,
  }
  return (
    <main>
      <Image
        src={bgMob}
        alt=''
        priority
        className={`${styles.bg} ${styles.bgMob}`}
      />
      <Image
        src={bgTab}
        alt=''
        priority
        className={`${styles.bg} ${styles.bgTab}`}
      />
      <Image
        src={bg}
        alt=''
        priority
        className={`${styles.bg} ${styles.bgDesk}`}
      />
      <UserInfo user={mockUser} />
    </main>
  )
}

export { MainPage }
