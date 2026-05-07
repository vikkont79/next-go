import { Button, InlineEditor } from '@/shared/ui'
import type { User } from '@/entities/user'
import { updateUserName } from '@/entities/user'
import styles from './EditingInfo.module.css'

interface EditingInfoProps {
  className?: string;
  user: User | null;
}

const EditingInfo = ({ user }: EditingInfoProps) => {
  return (
    <section className={styles.info}>
      <Button
        className={styles.photoBtn}
        variant='transparent'
        size='large'
      >Сменить фото</Button>
      <InlineEditor
        className={styles.name}
        value={user?.name || ''}
        onSave={updateUserName}
      />
    </section>
  )
}

export { EditingInfo }
