'use client';

import styles from './Modal.module.css'

interface ModalProps {
  id: string;
  labelledBy?: string;
  children: React.ReactNode;
}

const Modal = ({
  id,
  labelledBy,
  children,
}: ModalProps) => {
  return (
    <dialog
      className={styles.modal}
      id={id}
      aria-labelledby={labelledBy}
    >
      {children}
    </dialog>
  )
}

export { Modal }
