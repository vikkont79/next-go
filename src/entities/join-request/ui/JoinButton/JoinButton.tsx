'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui'
import { createJoinRequest } from '../../api/create-join-request'
import styles from './JoinButton.module.css'
import { JOIN_BUTTON_STATUSES, JoinRequestStatus } from '@/shared/config'
import { toast } from 'sonner'

interface JoinButtonProps {
  className: string;
  tripId: string;
  initialStatus: JoinRequestStatus;
}

const JoinButton = ({
  className,
  tripId,
  initialStatus = 'idle'
}: JoinButtonProps) => {
  const [status, setStatus] = useState(initialStatus)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()


  const handleClick = async () => {
    setIsLoading(true)
    const result = await createJoinRequest(tripId)

    try {
      const result = await createJoinRequest(tripId)

      if (!result.success) {
        toast.error(result.error || 'Не удалось отправить заявку')
        return
      }

      setStatus('pending')
      toast.success('Заявка отправлена!')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  const config = JOIN_BUTTON_STATUSES[status]


  return (
    <Button
      className={`${styles[status]} ${className}`}
      onClick={handleClick}
      disabled={config.disabled || isLoading}
    >
      {isLoading ? 'Отправка...' : config.text}
    </Button>
  )
}

export { JoinButton }
