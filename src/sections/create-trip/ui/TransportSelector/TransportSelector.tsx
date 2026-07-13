import type { TransportType } from '@/entities/trip'
import { TransportIcons } from '@/shared/ui'
import styles from './TransportSelector.module.css'

type TransportSelectorProps = {
  className: string;
  selected: TransportType[];
  onChange: (value: TransportType[]) => void;
  error?: string;
}

const TransportSelector = ({
  className,
  selected,
  onChange,
  error,
}: TransportSelectorProps) => {
  const handleToggle = (type: TransportType) => {
    const newSelected = selected.includes(type)
      ? selected.filter(item => item !== type)
      : [...selected, type]
    onChange(newSelected)
  }
  return (
    <div className={`${styles.transport} ${className}`} data-invalid={!!error}>
      <TransportIcons
        className={styles.list}
        selected={selected}
        onChange={handleToggle}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export { TransportSelector }
