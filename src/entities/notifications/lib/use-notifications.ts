'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUnreadNotifications } from '../api/get-notifications'
import { Notification } from '../types'
import { markNotificationsAsRead } from '../api/mark-notifications'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await getUnreadNotifications()
      if ('error' in result) {
        console.error(result.error)
        return
      }
      if ('notifications' in result) {
        setNotifications(result.notifications)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Polling
  useEffect(() => {
    fetchNotifications() // Первый запрос сразу

    const interval = setInterval(() => {
      if (!document.hidden) {
        fetchNotifications()
      }
    }, 30000) // 30 секунд

    return () => clearInterval(interval)
  }, [fetchNotifications])

  const markAsRead = async (ids: string[]) => {
    await markNotificationsAsRead(ids)
    // Оптимистичное обновление: помечаем локально как прочитанные
    setNotifications(prev =>
      prev.map(n => ids.includes(n.id) ? { ...n, read: true } : n)
    )
  }

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    isLoading,
    refresh: fetchNotifications,
    markAsRead
  }
}
