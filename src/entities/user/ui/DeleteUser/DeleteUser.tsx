'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui'
import { deleteUser } from '../../api'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/entities/user'
import styles from './DeleteUser.module.css'

const DeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()
  const clearUser = useUserStore((state) => state.clearUser)

  const handleDelete = async () => {
    setIsLoading(true)
    const result = await deleteUser()

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    clearUser()
    router.refresh()
  }

  const handleCancel = () => {
    (document.getElementById('delete-modal') as HTMLDialogElement)?.close()
    setError(null)
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title} id='delete-modal-title'>
        Удалить аккаунт
      </h2>
      <p className={styles.warning}>
        Это действие необратимо. Все ваши данные будут удалены навсегда.
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.confirm}>
        <input
          type="checkbox"
          id="confirm-delete"
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <label htmlFor="confirm-delete">
          Я понимаю, что данные будут удалены безвозвратно
        </label>
      </div>
      <Button
        onClick={handleDelete}
        disabled={!confirmed || isLoading}
        size='small'
      >
        {isLoading ? 'Удаление...' : 'Удалить навсегда'}
      </Button>
      <Button
        onClick={handleCancel}
        variant='transparent'
        size='small'
      >
        Отмена
      </Button>
    </div>
  )
}

export { DeleteUser }
