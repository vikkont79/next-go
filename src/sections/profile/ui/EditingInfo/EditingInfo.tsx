import { Button, InlineEditor, InvokeEditor, Modal } from '@/shared/ui'
import type { User } from '@/entities/user'
import { AvatarUpload, updateUserName, updateEmail, ChangeEmail, ChangePassword } from '@/entities/user'
import styles from './EditingInfo.module.css'
import { DeleteUser } from '@/entities/user/ui';

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
          className={styles.editBtn}
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
        field='name'
        onSave={updateUserName}
        isOwner={isOwner}
      />
      <InvokeEditor
        value={user?.email || ''}
        commandFor='email-modal'
        ariaLabel='Открыть форму редактирования email'
        isOwner={isOwner}
      />
      {isOwner && (
        <Button
          className={styles.editBtn}
          variant='transparent'
          size='large'
          commandfor='password-modal'
          command='show-modal'
        >
          Сменить пароль
        </Button>
      )}
      {isOwner && (
        <Button
          className={`${styles.editBtn} ${styles.deleteBtn}`}
          variant='transparent'
          size='large'
          commandfor='delete-modal'
          command='show-modal'
        >
          Удалить аккаунт
        </Button>
      )}
      <Modal id='avatar-modal' labelledBy='avatar-modal-title'>
        <AvatarUpload />
      </Modal>
      <Modal id='email-modal' labelledBy='email-modal-title'>
        <ChangeEmail />
      </Modal>
      <Modal id='password-modal' labelledBy='password-modal-title'>
        <ChangePassword />
      </Modal>
      <Modal id='delete-modal' labelledBy='delete-modal-title'>
        <DeleteUser />
      </Modal>
    </section>
  )
}

export { EditingInfo }
