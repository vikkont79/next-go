import styles from './Icon.module.css'

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  size?: number | string;
  mobSize?: number | string;
  color?: string;
  label?: string;
}

const Icon = ({
  name,
  size = 24,
  mobSize = 16,
  color = 'currentColor',
  className = '',
  label,
  ...props
}: IconProps) => {
  const desktopSize = typeof size === 'number' ? `${size}px` : size
  const mobileSize = mobSize
    ? (typeof mobSize === 'number' ? `${mobSize}px` : mobSize)
    : desktopSize
  const inlineStyles = {
    '--icon-size': desktopSize,
    '--icon-size-mob': mobileSize,
    '--icon-color': color,
    '--icon-mask': `url(/icons/${name}.svg)`,
  } as React.CSSProperties

  const accessibilityProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true }

  return (
    <span
      className={`${styles.icon} ${className}`.trim()}
      style={inlineStyles}
      {...accessibilityProps}
      {...props}
    />
  )
}

export {
  Icon,
  type IconProps,
}
