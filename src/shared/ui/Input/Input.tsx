import { useId, forwardRef } from 'react'
import type { BaseInputProps, Size } from '../../types'
import styles from './Input.module.css'

interface InputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'disabled' | 'className' | 'placeholder' | 'id' | 'name'> {
  label: string;
  hiddenLabel?: boolean;
  error?: string;
  size?: Size;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  defaultValue,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel = false,
  error,
  size = 'base',
  type = 'text',
  ...props
}, ref) => {
  const id = useId()
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')

  return (
    <label
      className={`${styles.inputWrapper} ${className || ''}`.trim()}
    >
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>{label}</span>
      <input
        ref={ref}
        className={`${styles.input} ${styles[size]}`}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        id={id}
        name={name}
        disabled={disabled}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  )
})

export { Input }

