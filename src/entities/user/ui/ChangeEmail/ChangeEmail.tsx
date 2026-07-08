'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, type EmailInput } from '@/shared/lib'
import { Button, Input } from '@/shared/ui'
import { updateEmail } from '../../api'
import { useUserStore } from '@/entities/user'
import styles from './ChangeEmail.module.css'

const ChangeEmail = () => {
  const updateUser = useUserStore((state) => state.updateUser)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema)
  })

  const onSubmit = async (data: EmailInput) => {
    const result = await updateEmail(data.email)

    if (result.error) {
      setError('email', { message: result.error })
      return
    }

    updateUser({ email: data.email })
    reset();
    (document.getElementById('email-modal') as HTMLDialogElement)?.close()
  }

  const handleCancel = () => {
    reset();
    (document.getElementById('email-modal') as HTMLDialogElement)?.close()
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title} id='email-modal-title'>
        Сменить email
      </h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.input}
          placeholder='Новый email'
          label='Новый email'
          hiddenLabel
          size='small'
          {...register('email')}
          error={errors.email?.message}
        />
        <div className={styles.actions}>
          <Button
            type='submit'
            size='small'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </Button>
          <Button
            size='small'
            variant='transparent'
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  )
}

export { ChangeEmail }
