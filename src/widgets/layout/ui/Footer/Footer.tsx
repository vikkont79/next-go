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
          alt='Хуета'
          width={200}
          height={50}
        />
      </Link>
    </footer>
  )
}

export { Footer }
