import NextLink from 'next/link'
import styles from './Button.module.css'
import type { BasePressableProps, Size, Variant } from '../../types/base'

interface BaseButtonProps extends BasePressableProps {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = BaseButtonProps & (
  | {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    href?: never;
  }
  | {
    href: string;
    type?: never;
    onClick?: never;
  }
)

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'base',
  type = 'button',
  onClick,
  href,
  popoverTarget,
  popoverTargetAction,
  ...props
}: ButtonProps) => {
  return href ? (
    <NextLink
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`.trim()}
      href={href}
      {...props}

    >
      {children}
    </NextLink>
  ) : (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`.trim()}
      type={type}
      onClick={onClick}
      popoverTarget={popoverTarget}
      popoverTargetAction={popoverTargetAction}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Button,
  type ButtonProps,
}
