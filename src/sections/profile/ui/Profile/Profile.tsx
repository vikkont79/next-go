import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import { InlineEditor } from '@/shared/ui'
import styles from './Profile.module.css'
import { EditingInfo } from '../EditingInfo/EditingInfo'

const ProfilePage = async () => {
  const user = await getCurrentUser()
  return (
    <main className={`${styles.profile} wrapper`} >
      <h1 className='visually-hidden'>Страница профиля пользователя</h1>
      <UserInfo className={styles.user} user={user} />
      <EditingInfo user={user} />
    </main >
  )
}

export { ProfilePage }
