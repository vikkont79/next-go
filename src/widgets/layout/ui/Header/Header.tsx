import { IconButton, Link } from '@/shared/ui'
import Image from 'next/image';
import logo from '@/shared/assets/images/logo-white.png'
import popupLogo from '@/shared/assets/images/logo-black.png'
import styles from './Header.module.css'



const Header = () => {
  return (
    <header className={`${styles.header} wrapper`}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            className={styles.image}
            src={logo}
            alt='Логотип сайта "Погнали"'
            width={200}
            height={50}
          />
        </Link>
        <ul className={styles.navList}>
          <li><Link className={styles.navItem}>о сервисе</Link></li>
          <li><Link className={styles.navItem} href='#'>направления</Link></li>
          <li><Link className={styles.navItem} href='#'>попутчики</Link></li>
        </ul>
        <IconButton
          icon='burger'
          iconColor='white'
          variant='transparent'
          className={styles.open}
          popoverTarget='nav-list'
          aria-label='Открыть меню'
        />
        <div
          className={styles.popup}
          id='nav-list'
          popover='auto'
        >
          <IconButton
            className={styles.close}
            icon='close'
            iconSize={20}
            variant='transparent'
            popoverTarget='nav-list'
            popoverTargetAction='hide'
            aria-label='Закрыть меню'
          />
          <Link href='/'>
            <Image
              className={styles.image}
              src={popupLogo}
              alt='Логотип сайта "Погнали"'
              width={200}
              height={50}
            />
          </Link>
          <ul className={styles.navListMob}>
            <li><Link className={styles.navItem}>о сервисе</Link></li>
            <li><Link className={styles.navItem} href='#'>направления</Link></li>
            <li><Link className={styles.navItem} href='#'>попутчики</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export { Header }
