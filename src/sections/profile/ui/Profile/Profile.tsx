import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import { InlineEditor } from '@/shared/ui'
import styles from './Profile.module.css'
import { EditingInfo } from '../EditingInfo/EditingInfo'
import { getUserById } from '@/shared/lib/get-user-by-id'

interface ProfilePageProps {
  userId?: string | undefined;
}

const ProfilePage = async ({ userId }: ProfilePageProps) => {
  const user = userId ? await getUserById(userId) : await getCurrentUser()

  if (!user) return <div>Пользователь не найден</div>

  const isOwner = !userId

  return (
    <main className={`${styles.profile} wrapper`} >
      <h1 className='visually-hidden'>Страница профиля пользователя</h1>
      <UserInfo className={styles.user} user={user} />
      {isOwner ? (
        <EditingInfo user={user} />
      ) : (
        <div>Просмотр чужого профиля</div>
      )}
    </main >
  )
}

export { ProfilePage }
