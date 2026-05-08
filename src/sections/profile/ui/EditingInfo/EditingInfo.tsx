import { Button, InlineEditor, Modal } from '@/shared/ui'
import type { User } from '@/entities/user'
import { AvatarUpload, updateUserName } from '@/entities/user'
import styles from './EditingInfo.module.css'

interface EditingInfoProps {
  className?: string;
  user: User | null;
  isOwner: boolean;
}

const EditingInfo = ({ className, user, isOwner }: EditingInfoProps) => {
  return (
    <section className={`${styles.info} ${className || ''}`.trim()}>
      {isOwner && (
        <Button
          className={styles.photoBtn}
          variant='transparent'
          size='large'
          commandfor='avatar-modal'
          command='show-modal'
        >
          Сменить фото
        </Button>
      )}
      <InlineEditor
        value={user?.name || ''}
        onSave={updateUserName}
        isOwner={isOwner}
      />
      <Modal id='avatar-modal'>
        <AvatarUpload />
      </Modal>
    </section>
  )
}

export { EditingInfo }
