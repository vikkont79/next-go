import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import styles from './Layout.module.css'

interface LayoutProps { children: React.ReactNode }

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export { Layout }
