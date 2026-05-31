import type { TransportType } from '@/entities/trip'
import { TransportIcons } from '@/shared/ui'
import styles from './TransportSelector.module.css'

type TransportSelectorProps = {
  selected: TransportType[];
  onChange: (value: TransportType[]) => void;
  error?: string;
}

const TransportSelector = ({
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
    <>
      <fieldset
        className={styles.field}
        data-invalid={!!error}
      >
        <legend className={styles.fieldTitle}>
          транспорт
        </legend>
        <TransportIcons
          selected={selected}
          onChange={handleToggle}
        />
      </fieldset>
      {error && <span className={styles.error}>{error}</span>}
    </>
  )
}

export { TransportSelector }
