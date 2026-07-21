'use client'

import { Notification } from "../../types"

interface NotificationListProps {
  notifications: Notification[]
  isLoading: boolean
  onClose: () => void
}

export function NotificationList({ notifications, isLoading, onClose }: NotificationListProps) {

  return (
    <div>
      <div>
        <h3>Уведомления</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <div>
        {notifications.length === 0 ? (
          <p>Нет новых уведомлений</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id}>
              {n.text}
              <div>{n.createdAt.toLocaleTimeString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
