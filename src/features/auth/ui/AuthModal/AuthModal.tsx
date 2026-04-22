'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login, register as registerAction } from '../../api';
import { useUserStore } from '@/entities/user';
import { loginSchema, registerSchema, type RegisterInput, type LoginInput } from '@/shared/lib/validation/auth-schemas';
import { Input, Button } from '@/shared/ui';

const AuthModal = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [serverError, setServerError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput | LoginInput>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: RegisterInput | LoginInput) => {
    setServerError(null);

    const action = mode === 'login' ? login : registerAction;
    const result = await action(data);

    if ('error' in result && result.error) {
      setServerError(result.error);
      return;
    }

    if ('success' in result && result.success && result.user) {
      setUser(result.user);
      (document.getElementById('auth-modal') as HTMLDialogElement)?.close();
    }
  };

  return (
    <div>
      <div>
        <button type="button" onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>
          Вход
        </button>
        <button type="button" onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>
          Регистрация
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === 'register' && (
          <Input
            label="Имя"
            placeholder="Введите имя"
            {...register('name')}
            error={'name' in errors ? errors.name?.message : undefined}
          />
        )}

        <Input
          label="Email"
          type="email"
          placeholder="ivan@example.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Пароль"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        {serverError && <div className="error">{serverError}</div>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  );
};

export { AuthModal }
