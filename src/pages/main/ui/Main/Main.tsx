import Image from 'next/image'
import { UserInfo } from '@/entities/user'
import { Modal, Button } from '@/shared/ui'
import bgMob from '@/shared/assets/images/bg-mob.png'
import bgTab from '@/shared/assets/images/bg-tablet.png'
import bg from '@/shared/assets/images/bg-desktop.png'
import styles from './Main.module.css'
import { AuthModal, LogoutButton } from '@/features/auth'

const MainPage = () => {
  return (
    <main className='wrapper'>
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
      <Modal id='auth-modal'>
        <AuthModal />
      </Modal>
    </main>
  )
}

export { MainPage }
