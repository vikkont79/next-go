import { useId } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './CounterInput.module.css'


interface CounterInputProps {
  label: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  error?: string;
  iconSize?: number | string;
  className?: string;
}

const CounterInput = ({
  label,
  value,
  unit,
  onChange,
  min,
  max,
  step = 1,
  error,
  iconSize = 20,
  className = '',
}: CounterInputProps) => {
  const id = useId()
  const name = label
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]/g, '_')
    .replace(/^_|_$/g, '')

  const handleIncrement = () => {
    onChange(Math.min(max, value + step))
  }

  const handleDecrement = () => {
    onChange(Math.max(min, value - step))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value)
    if (!isNaN(num)) {
      onChange(num)
    }
  }

  return (
    <label className={`${styles.counterWrapper} ${className}`.trim()}>
      <span className={styles.label}>
        {label}
      </span>
      <div className={styles.counter}>
        <button
          type='button'
          onClick={handleDecrement}
          disabled={value <= min}
          className={styles.button}
          aria-label='Уменьшить'
        >
          <Icon name='minus' size={iconSize} />
        </button>
        <input
          id={id}
          name={name}
          type='text'
          inputMode='numeric'
          value={value}
          onChange={handleInputChange}
          className={styles.input}
          aria-label={label}
          aria-invalid={!!error}
        />
        <button
          type='button'
          onClick={handleIncrement}
          disabled={value >= max}
          className={styles.button}
          aria-label='Увеличить'
        >
          <Icon name='plus' size={iconSize} />
        </button>
        {error && (
          <span className={styles.error}>{error}</span>
        )}
      </div>
      {unit && <span className={styles.label}>{unit}</span>}

    </label>
  )
}

export { CounterInput }
