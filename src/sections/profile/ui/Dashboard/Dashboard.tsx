'use client'
import { JoinRequest, RequestCard } from '@/entities/join-request'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import styles from './Dashboard.module.css'

interface DashboardProps {
  requests: JoinRequest[]
  onApprove: (requestId: string) => Promise<{ success: boolean; error?: string }>
  onReject: (requestId: string) => Promise<{ success: boolean; error?: string }>
}

const Dashboard = ({
  requests,
  onApprove,
  onReject,
}: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleApprove = async (requestId: string) => {
    setIsLoading(true)
    try {
      const result = await onApprove(requestId)
      if (!result.success) {
        console.error(result.error || 'Не удалось подтвердить заявку')
        toast.error(result.error || '❌ Не удалось подтвердить заявку')
        return
      }
      toast.success('✅ Заявка подтверждена')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ' Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async (requestId: string) => {
    setIsLoading(true)
    try {
      const result = await onReject(requestId)
      if (!result.success) {
        console.error(result.error || 'Не удалось отклонить заявку')
        toast.error(result.error || 'Не удалось отклонить заявку')
        return
      }
      toast.success('Заявка отклонена')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : ' Произошла ошибка')
    } finally {
      setIsLoading(false)
    }
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
