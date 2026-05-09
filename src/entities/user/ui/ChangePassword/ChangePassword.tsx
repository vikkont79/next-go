'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema, type PasswordInput } from '@/shared/lib'
import { Button, Input } from '@/shared/ui'
import { updatePassword } from '../../api'
import styles from './ChangePassword.module.css'

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordInput) => {
    const result = await updatePassword(data)

    if (result.error) {
      setError('root', { message: result.error })
      return
    }

    reset();
    (document.getElementById('password-modal') as HTMLDialogElement)?.close()
  }

  const handleCancel = () => {
    reset();
    (document.getElementById('password-modal') as HTMLDialogElement)?.close()
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title} id='password-modal-title'>
        Сменить пароль
      </h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          className={styles.input}
          type='password'
          placeholder='Текущий пароль'
          label='Текущий пароль'
          size='small'
          {...register('currentPassword')}
          error={errors.currentPassword?.message}
        />
        <Input
          className={styles.input}
          type='password'
          placeholder='Новый пароль'
          label='Новый пароль'
          size='small'
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />
        <Input
          className={styles.input}
          type='password'
          placeholder='Подтвердите пароль'
          label='Подтвердите пароль'
          size='small'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        {errors.root && <div className={styles.error}>{errors.root.message}</div>}

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

export { ChangePassword }
