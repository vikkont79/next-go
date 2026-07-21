'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUnreadNotifications } from '../api/get-notifications'
import { Notification } from '../types'
import { getUnreadNotificationsCount } from '../api/get-unread-count'

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchCount = async () => {
      if (document.hidden) return

      try {
        const result = await getUnreadNotificationsCount()
        if ('error' in result) {
          console.error(result.error)
          return
        }
        if ('count' in result && isMounted) {
          setUnreadCount(result.count)
        }
      } catch (error) {
        console.error('Polling count error:', error)
      }
    }

    fetchCount()
    const interval = setInterval(fetchCount, 30000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

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
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Fetch notifications error:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])


  return {
    unreadCount,
    notifications,
    isLoading,
    fetchNotifications,
  }
}
