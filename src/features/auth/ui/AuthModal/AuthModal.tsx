'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login, register as registerAction } from '../../api'
import { useUserStore } from '@/entities/user'
import { loginSchema, registerSchema, type RegisterInput, type LoginInput } from '@/shared/lib/validation/auth-schemas'
import { Input, Button } from '@/shared/ui'
import styles from './AuthModal.module.css'

const AuthModal = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [serverError, setServerError] = useState<string | null>(null)
  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegisterInput | LoginInput>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: RegisterInput | LoginInput) => {
    setServerError(null)

    const action = mode === 'login' ? login : registerAction
    const result = await action(data)

    if ('error' in result && result.error) {
      setServerError(result.error)
      return
    }

    if ('success' in result && result.success && result.user) {
      setUser(result.user)
      reset();
      (document.getElementById('auth-modal') as HTMLDialogElement)?.close()
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.buttons}>
        <Button
          className={mode === 'login' ? 'active' : ''}
          size='small'
          onClick={() => setMode('login')}
        >
          Вход
        </Button>
        <Button
          className={mode === 'register' ? 'active' : ''}
          size='small'
          onClick={() => setMode('register')}
        >
          Регистрация
        </Button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {mode === 'register' && (
          <Input
            className={styles.input}
            placeholder="Ваше имя"
            label="Имя"
            size='small'
            {...register('name')}
            error={'name' in errors ? errors.name?.message : undefined}
          />
        )}

        <Input
          className={styles.input}
          placeholder="Ваш e-mail"
          label="Email"
          size='small'
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          className={styles.input}
          label="Пароль"
          placeholder="••••••"
          size='small'
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        {serverError && <div className="error">{serverError}</div>}

        <Button
          className={styles.submit}
          type="submit"
          size='small'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  )
}

export { AuthModal }
