'use client'

import { useState } from 'react'
import { IconButton, Input } from '@/shared/ui'
import styles from './InlineEditor.module.css'

interface InlineEditorProps {
  className?: string;
  value: string;
  onSave: (newValue: string) => Promise<{ error?: string; success?: boolean }>;
}

const InlineEditor = ({ value, onSave }: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [error, setError] = useState<string | undefined>()

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
      <div className={styles.edit}>
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
    <div className={styles.name}>
      <span>{value}</span>
      <IconButton
        className={styles.check}
        icon="edit"
        variant='transparent'
        onClick={() => setIsEditing(true)} />
    </div>
  )
}

export { InlineEditor }

