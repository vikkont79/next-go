'use client'

import { useState, useRef } from 'react'
import { Button } from '@/shared/ui'
import { updateAvatar } from '../../api'
import styles from './AvatarUpload.module.css'

const AvatarUpload = () => {
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      setError('Можно загружать только изображения')
      return
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('Файл не должен превышать 5 МБ')
      return
    }

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setError(null)
  }

  const handleSave = async () => {
    if (!file) return

    setIsLoading(true)
    const formData = new FormData()
    formData.append('avatar', file)

    const result = await updateAvatar(formData)

    if (result.error) {
      setError(result.error)
    }

    if (result.success) {
      (document.getElementById('avatar-modal') as HTMLDialogElement)?.close()
      setPreview(null)
      setFile(null)
      setError(null)
      if (inputRef.current) inputRef.current.value = ''
    }
    setIsLoading(false)
  }

  const handleCancel = () => {
    (document.getElementById('avatar-modal') as HTMLDialogElement)?.close()
    setPreview(null)
    setFile(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title} id='email-modal-title'>
        Сменить фото
      </h2>

      <div className={styles.preview}>
        {preview ? (
          <img src={preview} alt='Предпросмотр' className={styles.image} />
        ) : (
          <div className={styles.placeholder}>Нет фото</div>
        )}
      </div>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className={styles.input}
      />

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.actions}>
        <Button
          size='small'
          onClick={handleSave}
          disabled={!file || isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Сохранить'}
        </Button>
        <Button
          size='small'
          variant='transparent'
          onClick={handleCancel}
        >
          Отмена
        </Button>
      </div>
    </div>
  )
}

export { AvatarUpload }
