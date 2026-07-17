'use client'
import { Button, Avatar, CountryFlag, Link } from '@/shared/ui'
import { JoinRequest, RequestCard } from '@/entities/join-request'
import { getCountryByCode } from '@/shared/lib'
import { useState } from 'react'
import styles from './Dashboard.module.css'
import { useRouter } from 'next/navigation'

interface DashboardWidgetProps {
  requests: JoinRequest[]
  onApprove: (requestId: string) => Promise<{ success: boolean; error?: string }>
  onReject: (requestId: string) => Promise<{ success: boolean; error?: string }>
}

const Dashboard = ({
  requests,
  onApprove,
  onReject,
}: DashboardWidgetProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleApprove = async (requestId: string) => {
    setIsLoading(true)
    const result = await onApprove(requestId)
    if (result.success) {
      router.refresh()
    } else {
      console.error(result.error || 'Не удалось подтвердить заявку')
    }
    setIsLoading(false)
  }

  const handleReject = async (requestId: string) => {
    setIsLoading(true)
    const result = await onReject(requestId)
    if (result.success) {
      router.refresh()
    } else {
      console.error(result.error || 'Не удалось отклонить заявку')
    }
    setIsLoading(false)
  }

  if (requests.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📭 Нет входящих заявок</p>
      </div>
    )
  }

  return (
    <section className={styles.dashboard}>
      <h2 className={styles.title}>Входящие заявки ({requests.length})</h2>
      <ul className={styles.list}>
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            isLoading={isLoading}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </ul>
    </section>
  )
}


export { Dashboard }
