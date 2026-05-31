import { TRANSPORT_OPTIONS } from '@/shared/config'
import type { TransportType } from '@/entities/trip'
import { IconButton } from '../IconButton/IconButton'
import styles from './TransportIcons.module.css'

type TransportIconsProps = {
  selected: TransportType[];
  onChange: (type: TransportType) => void;
  error?: string;
}

const TransportIcons = ({
  selected,
  onChange,
}: TransportIconsProps) => {
  return (
    <ul className={styles.transportList}>
      {TRANSPORT_OPTIONS.map((item) => (
        <li key={item}>
          <IconButton
            className={styles.transportButton}
            icon={item}
            onClick={() => onChange(item)}
            iconLabel={item}
            aria-pressed={selected.includes(item)}
          />
        </li>
      ))}
    </ul>
  )
}

export { TransportIcons }
