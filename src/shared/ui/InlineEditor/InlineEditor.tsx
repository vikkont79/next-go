'use client'

import { useState } from 'react'
import { IconButton, Input } from '@/shared/ui'
import styles from './InlineEditor.module.css'
import { User, useUserStore } from '@/entities/user';

interface InlineEditorProps {
  className?: string;
  value: string;
  field: keyof User;
  onSave: (newValue: string) => Promise<{ error?: string; success?: boolean }>;
  isOwner: boolean;
}

const InlineEditor = ({
  className = '',
  value,
  field,
  onSave,
  isOwner
}: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [error, setError] = useState<string | undefined>()
  const updateUser = useUserStore((state) => state.updateUser)

  const handleSave = async () => {
    if (!editValue.trim() || editValue === value) {
      setIsEditing(false)
      setError(undefined)
      return
    }

    const result = await onSave(editValue.trim())

    if (result.error) {
      setError(result.error)
      return
    }

    updateUser({ [field]: editValue.trim() })
    setError(undefined)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setError(undefined)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className={styles.editField}>
        <Input
          className={styles.input}
          label='Имя'
          hiddenLabel
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          error={error}
        />
        <IconButton
          icon="tick"
          variant='transparent'
          onClick={handleSave} />
        <IconButton
          icon="close"
          variant='transparent'
          onClick={handleCancel} />
      </div>
    )
  }

  return (
    <div className={`${styles.infoField} ${className || ''}`.trim()}>
      <p>{value}</p>
      {isOwner && (
        <IconButton
          className={styles.checkBtn}
          icon="edit"
          variant='transparent'
          iconLabel='Редактировать'
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  )
}

export { InlineEditor }

