'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui'
import { deleteTrip } from '../../api/delete-trip'
import { toast } from 'sonner'
import styles from './DeleteTrip.module.css'

const DeleteTrip = ({ tripId }: { tripId: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsLoading(true)
    const result = await deleteTrip(tripId)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    toast.success('✅ Маршрут удалён')
    router.push('/trips')
  }

  const handleCancel = () => {
    (document.getElementById('delete-modal') as HTMLDialogElement)?.close()
    setError(null)
    setConfirmed(false)
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title} id='delete-modal-title'>
        Удалить маршрут
      </h2>
      <p className={styles.warning}>
        Это действие необратимо. Маршрут будет удалён навсегда.
      </p>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.confirm}>
        <input
          type="checkbox"
          id="confirm-delete"
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <label htmlFor="confirm-delete">
          Я подтверждаю удаление маршрута</label>
      </div>
      <Button
        onClick={handleDelete}
        disabled={!confirmed || isLoading}
        size='small'
      >
        {isLoading ? 'Удаление...' : 'Удалить маршрут'}
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

export { DeleteTrip }
