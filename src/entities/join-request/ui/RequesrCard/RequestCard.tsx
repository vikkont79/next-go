import { Avatar, Button, CountryFlag, Icon, Link } from '@/shared/ui'
import { JoinRequest } from '../../types'
import { getCountryByCode } from '@/shared/lib'
import { TRANSPORT_OPTIONS } from '@/shared/config'
import styles from './RequestCard.module.css'

interface RequestCardProps {
  request: JoinRequest;
  className?: string;
  isLoading: boolean;
  onApprove: (requestId: string) => void
  onReject: (requestId: string) => void
}

const RequestCard = ({
  request,
  className,
  isLoading,
  onApprove,
  onReject,
}: RequestCardProps) => {
  const avatarSrc = request.user.avatar || '/icons/unknown-raccoon.svg'
  return (
    <article className={`${styles.card} ${className || ''}`.trim()}>
      <Link href={`/profile/${request.user.id}`} className={styles.link}>
        <Avatar
          className={styles.avatar}
          src={avatarSrc}
          alt={`Аватар ${request.user.name}`}
        />
      </Link>
      <Link href={`/profile/${request.user.id}`} className={styles.name}>
        {request.user.name}
      </Link>
      <p className={styles.text}>захотел присоединиться к этому маршруту</p>
      <ul className={styles.countries}>
        {request.trip.countries.map(c => {
          const country = getCountryByCode(c.code)
          return (
            <li className={styles.country} key={country?.code}>
              <CountryFlag
                code={c.code}
                name={country?.name_ru ?? c.code} />
              <span>
                {country?.name_ru}
              </span>
            </li>
          )
        })}
      </ul>
      <div className={styles.options}>
        <ul className={styles.transport}>
          {TRANSPORT_OPTIONS.map(type => (
            <li key={type}>
              <Icon
                className={request.trip.transport.includes(type) ? styles.activeIcon : styles.icon}
                name={type}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>
        {request.status === 'pending' ? (
          <>
            <Button
              className={`${styles.button} ${styles.approve}`}
              onClick={() => onApprove(request.id)}
              disabled={isLoading}
            >
              Подтвердить
            </Button>
            <Button
              className={`${styles.button} ${styles.reject}`}
              onClick={() => onReject(request.id)}
              disabled={isLoading}
            >
              Отклонить
            </Button>
          </>) : (
          <span className={styles.status}>
            {request.status === 'approved' ? '✅ Подтверждена' : '❌ Отклонена'}
          </span>
        )}
      </div>
    </article >
  )
}

export { RequestCard }

