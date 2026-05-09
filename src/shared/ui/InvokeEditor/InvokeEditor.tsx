'use client'

import { IconButton } from '@/shared/ui'
import styles from './InvokeEditor.module.css'

interface InvokeEditorProps {
  className?: string;
  value: string;
  commandFor: string;
  ariaLabel: string;
  isOwner: boolean;
}

const InvokeEditor = ({
  className = '',
  value,
  commandFor,
  ariaLabel,
  isOwner
}: InvokeEditorProps) => {
  return (
    <div className={`${styles.infoField} ${className || ''}`.trim()}>
      <p>{value}</p>
      {isOwner && (
        <IconButton
          className={styles.checkBtn}
          icon="edit"
          variant='transparent'
          commandfor={commandFor}
          command='show-modal'
          iconLabel={ariaLabel}
        />
      )}
    </div>
  )
}

export { InvokeEditor }
