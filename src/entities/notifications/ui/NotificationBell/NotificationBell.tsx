'use client'

import { useState } from 'react'
import { NotificationList } from '../NotificationList/NotificationList'
import { useNotifications } from '../../lib'


export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const { notifications, unreadCount, markAsRead } = useNotifications()

  const handleOpen = async () => {
    setIsOpen(true)
    // Помечаем все видимые как прочитанные
    const unreadIds = notifications.filter(n => !n.read).map(n => n.id)
    if (unreadIds.length > 0) {
      await markAsRead(unreadIds)
    }
  }

  return (
    <div>
      <button onClick={handleOpen}>
        🔔 {unreadCount > 0 && <span>({unreadCount})</span>}
      </button>

      {isOpen && <NotificationList notifications={notifications} onClose={() => setIsOpen(false)} />}
    </div>
  )
}
