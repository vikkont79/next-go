'use client';

import styles from './Modal.module.css'

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

const Modal = ({
  id,
  children,
}: ModalProps) => {
  return (
    <dialog
      id={id}
      className={styles.modal}
    >
      {children}
    </dialog>
  )
}

export { Modal }
