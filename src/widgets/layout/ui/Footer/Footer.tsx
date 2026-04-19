import { Link } from '@/shared/ui'
import Image from 'next/image';
import logo from '@/shared/assets/images/logo-black.png'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={`${styles.footer} wrapper`}>
      <Link href="/">
        <Image
          src={logo}
          alt='Логотип сайта "Погнали"'
        />
      </Link>
    </footer>
  )
}

export { Footer }
