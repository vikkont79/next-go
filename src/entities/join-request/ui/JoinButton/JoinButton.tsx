'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui'
import { createJoinRequest } from '../../api/create-join-request'
import styles from './JoinButton.module.css'
import { JOIN_BUTTON_STATUSES, JoinRequestStatus } from '@/shared/config'

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

    if (result.success) {
      setStatus('pending')
      router.refresh()
    } else {
      // TODO: тост или alert
      alert(result.error)
    }

    setIsLoading(false)
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
