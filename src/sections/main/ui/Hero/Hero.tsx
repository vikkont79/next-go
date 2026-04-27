import Image from 'next/image'
import bgMob from '@/shared/assets/images/traveller-mobile.png'
import bgTab from '@/shared/assets/images/traveller-tablet.png'
import bgDesk from '@/shared/assets/images/traveller-desktop.png'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={`${styles.hero} wrapper`}>
      <h1 className='visually-hidden'>
        Приложение для поиска попутчиков
      </h1>
      <p className={styles.slogan}>
        В путешествие<br />
        с крутыми<br />
        попутчиками!
      </p>
      <ul className={styles.roadmap}>
        <li className={styles.roadmapItem}>
          Выберите
          направление
        </li>
        <li className={styles.roadmapItem}>
          Изучите идеи
          путешественников
        </li>
        <li className={styles.roadmapItem}>
          Находите тех,
          кто{'\u00A0'}похож{'\u00A0'}на{'\u00A0'}вас
        </li>
        <li className={styles.roadmapItem}>
          Путешествуйте
          вместе!
        </li>
      </ul>
      <Image
        src={bgMob}
        alt='Изображение попутчика'
        priority
        className={`${styles.bg} ${styles.bgMob}`}
      />
      <Image
        src={bgTab}
        alt='Изображение попутчика'
        priority
        className={`${styles.bg} ${styles.bgTab}`}
      />
      <Image
        src={bgDesk}
        alt='Изображение попутчика'
        priority
        className={`${styles.bg} ${styles.bgDesk}`}
      />
    </section>
  )
}

export { Hero }
