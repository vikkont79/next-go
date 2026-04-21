'use client';

interface ModalProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({
  id,
  children,
  className = ''
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  };

  return (
    <dialog
      id={id}
      /*closedby="any" - ждём поддержки*/
      className={className}
      onClick={handleBackdropClick}
    >
      {children}
    </dialog>
  )
}

export { Modal }
