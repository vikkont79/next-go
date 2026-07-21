'use client'

import { useCallback, useState } from 'react'
import { NotificationList } from '../NotificationList/NotificationList'
import { useNotifications } from '../../lib'


export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount, notifications, isLoading, fetchNotifications } = useNotifications()

  const handleToggle = async () => {
    const newState = !isOpen
    setIsOpen(newState)

    // Загружаем список только при открытии
    if (newState) {
      await fetchNotifications()
    }
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div>
      <button onClick={handleToggle}>
        🔔 {unreadCount > 0 && <span>({unreadCount})</span>}
      </button>

      {isOpen && (
        <NotificationList
          notifications={notifications}
          isLoading={isLoading}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
