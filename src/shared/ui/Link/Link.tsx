import NextLink from 'next/link'
import styles from './Link.module.css'
import type { BasePressableProps } from '../../types/base'

type LinkProps = BasePressableProps & (
  | { href: string }
  | { href?: never }
)

const Link = ({
  children,
  className = '',
  href,
  ...props
}: LinkProps) => {
  return href ? (
    <NextLink
      className={`${styles.link} ${className || ''}`.trim()}
      href={href}
      {...props}
    >
      {children}
    </NextLink>
  ) : (
    <span
      className={`${styles.link} ${className || ''}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}

export { Link }
