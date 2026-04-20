import styles from './Level.module.css'

interface LevelProps {
  level: number;
  size?: number | string;
  strokeColor?: string;
  className?: string;
}

const Level = ({
  level,
  size = 100,
  strokeColor,
  className = '' }: LevelProps) => {
  const normalizedLevel = Math.min(100, Math.max(0, level))
  const circumference = 2 * Math.PI * 30
  const strokeDashoffset = circumference * (1 - normalizedLevel / 100)

  return (
    <div
      className={`${styles.userLevel} ${className}`.trim()}
      style={{
        '--size': typeof size === 'number' ? `${size}px` : size,
        ...(strokeColor && { '--stroke-color': strokeColor })
      } as React.CSSProperties}
    >
      {/* SVG для прогресс-бара (только обводка) */}
      <svg viewBox="0 0 63 63" className={styles.progress}>
        <circle
          cx="31.5"
          cy="31.5"
          r="30"
          fill="none"
          stroke="var(--stroke-color)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        // Начинаем сверху
        />
      </svg>

      {/* Цифра уровня */}
      <span className={styles.number}>
        {normalizedLevel}
      </span>

      {/* Черта */}
      <hr className={styles.line} />

      {/* Текст "level" */}
      <span className={styles.text}>
        level
      </span>
    </div>
  )
}

export { Level }
