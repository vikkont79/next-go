import Image from 'next/image'
import { Modal, Button } from '@/shared/ui'
import bgMob from '@/shared/assets/images/bg-mob.png'
import bgTab from '@/shared/assets/images/bg-tablet.png'
import bg from '@/shared/assets/images/bg-desktop.png'
import { Hero } from '../Hero/Hero'
import { About } from '../About/About'
import { AuthModal } from '@/features/auth'
import styles from './Main.module.css'

const MainPage = () => {
  return (
    <main className={`${styles.main} wrapper`}>
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
      <Hero />
      <About />
      <Modal id='auth-modal'>
        <AuthModal />
      </Modal>
    </main>
  )
}

export { MainPage }
