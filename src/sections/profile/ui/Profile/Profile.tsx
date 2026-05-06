import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import styles from './Profile.module.css'
import { InlineEditor } from '@/shared/ui'
import { updateUserName } from '@/entities/user'

const ProfilePage = async () => {
  const user = await getCurrentUser()
  return (
    <main className={`${styles.profile} wrapper`} >
      <UserInfo className={styles.user} user={user} />
      <InlineEditor
        value={user?.name || ''}
        onSave={updateUserName}
      />
    </main >
  )
}

export { ProfilePage }
