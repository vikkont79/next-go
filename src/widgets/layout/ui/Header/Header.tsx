import { IconButton, Link } from '@/shared/ui'
import Image from 'next/image'
import logo from '@/shared/assets/images/logo-white.png'
import logoPopup from '@/shared/assets/images/logo-black.png'
import { AuthButtons } from '@/features/auth'
import { HeaderTitle } from '../HeaderTitle/HeaderTitle'
import { getCurrentUser } from '@/shared/api/get-current-user'
import styles from './Header.module.css'

const Header = async () => {
  let user = null
  let authError = false
  try {
    user = await getCurrentUser()
  } catch (error) {
    authError = true
  }

  return (
    <>
      <header className={`${styles.header} wrapper`}>
        <Link href='/'>
          <Image
            className={styles.image}
            src={logo}
            alt='Логотип сайта "Погнали"'
            loading="eager"
          />
          <Image
            className={styles.imagePopup}
            src={logoPopup}
            alt='Логотип сайта "Погнали"'
            loading="eager"
          />
        </Link>
        <nav
          className={styles.nav}
          id='nav-list'
          popover='auto'
          aria-label='Основное меню'
        >
          <ul className={styles.navList}>
            <li><Link className={styles.navItem}>о сервисе</Link></li>
            <li><Link className={styles.navItem} href='/trips/create'>направления</Link></li>
            <li><Link className={styles.navItem} href='/trips'>попутчики</Link></li>
          </ul>
        </nav>
        <IconButton
          className={styles.open}
          icon='burger'
          iconColor='white'
          variant='transparent'
          popoverTarget='nav-list'
          aria-label='Открыть меню'
        />
        <IconButton
          className={styles.close}
          icon='close'
          iconSize={20}
          iconColor='var(--color-base-500)'
          variant='transparent'
          popoverTarget='nav-list'
          popoverTargetAction='hide'
          aria-label='Закрыть меню'
        />
        <AuthButtons className={styles.auth} user={user} />
        {authError && (
          <div title='Ошибка загрузки профиля'>
            ⚠️
          </div>
        )}
      </header>
      <HeaderTitle />
    </>
  )
}

export { Header }
