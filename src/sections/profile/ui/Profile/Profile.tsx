import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import styles from './Profile.module.css'

const ProfilePage = async () => {
  const user = await getCurrentUser()
  return (
    <main className='wrapper'>
      <UserInfo className={styles.user} user={user} />
    </main>
  )
}

export { ProfilePage }
