import styles from './Textarea.module.css'
import type { BaseInputProps, Size } from '../../types/base'
import { useId } from 'react';

interface TextareaProps extends BaseInputProps,
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'disabled' | 'className' | 'placeholder' | 'rows' | 'id' | 'name'> {
  label: string;
  hiddenLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  size?: Size;
  rows?: number;
}

const Textarea = ({
  value,
  onChange,
  placeholder,
  disabled,
  className = '',
  label,
  hiddenLabel,
  error,
  size = 'base',
  rows = 4,
  ...props
}: TextareaProps) => {
  const id = useId()
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <label className={`${styles.textareaWrapper} ${className}`.trim()}>
      <span className={hiddenLabel ? 'visually-hidden' : styles.label}>
        {label}
      </span>
      <textarea
        className={`${styles.textarea} ${styles[size]}`}
        value={value}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={handleChange}
        disabled={disabled}
        rows={rows}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      )}
    </label>
  )
}

export { Textarea, type TextareaProps }
