import Image from 'next/image'
import { IconButton } from '@/shared/ui'
import bgMob from '@/shared/assets/images/about-mobile.png'
import bgTab from '@/shared/assets/images/about-tablet.png'
import bgDesk from '@/shared/assets/images/about-desktop.png'
import styles from './About.module.css'

const About = () => {
  return (
    <section className={`${styles.about} wrapper`}>
      <h2 className={styles.title}>О сервисе</h2>
      <div className={styles.content}>
        <p className={styles.intro}>
          Любое путешествие веселее
          с{'\u00A0'}попутчиками, которые на одной волне
          с{'\u00A0'}тобой! Делитесь своими идеями
          путешествий и черпайте вдохновение
          в{'\u00A0'}чужих.
        </p>
        <p className={styles.intro}>
          А если найдете кого-то близкого по духу —
          скорее зовите в{'\u00A0'}совместный трип!
        </p>
      </div>
      <IconButton
        className={styles.btn}
        href='#about'
        size='large'
        icon='polygon'
        iconSizeMob={14}
        iconSize={14}
      >
        Подробнее
      </IconButton>
      <Image
        src={bgMob}
        alt='Телефон с открытым приложением'
        className={`${styles.bg} ${styles.bgMob}`}
      />
      <Image
        src={bgTab}
        alt='Телефон с открытым приложением'
        className={`${styles.bg} ${styles.bgTab}`}
      />
      <Image
        src={bgDesk}
        alt='Телефон с открытым приложением'
        className={`${styles.bg} ${styles.bgDesk}`}
      />
    </section>
  )
}

export { About }
