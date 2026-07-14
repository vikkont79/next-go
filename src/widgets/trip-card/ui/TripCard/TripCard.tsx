import { TRANSPORT_OPTIONS } from '@/shared/config'
import { Trip } from '../../../../entities/trip/types/trip'
import { Level, Icon, Button, IconButton, Avatar, CountryFlag, Link } from '@/shared/ui'
import { getCountryByCode } from '@/shared/lib'
import styles from './TripCard.module.css'


interface TripCardProps {
  trip: Trip;
  className?: string;
}

const TripCard = ({ trip, className }: TripCardProps) => {
  const avatarSrc = trip.user.avatar || '/icons/unknown-raccoon.svg'
  return (
    <article className={`${styles.card} ${className || ''}`.trim()}>
      <Link href={`/trips/${trip.id}`} className={styles.link}>
        <Avatar
          className={styles.avatar}
          src={avatarSrc}
          alt={`Аватар ${trip.user.name}`}
        />
      </Link>
      <Link href={`/trips/${trip.id}`} className={styles.name}>
        {trip.user.name}
      </Link>
      <div className={styles.tags}>
        {trip.tags.split(' ').map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <ul className={styles.countries}>
        {trip.countries.map(c => {
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
                className={trip.transport.includes(type) ? styles.activeIcon : styles.icon}
                name={type}
              />
            </li>
          ))}
        </ul>
        <Level className={styles.level} level={trip.user.level} />
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.call}
          href='#'
        >
          Хочу!
        </Button>
        <div className={styles.likes}>
          <IconButton
            className={styles.likeBtn}
            icon='heart'
            iconLabel='Избранное'
          />
          <span className={styles.likeQty}>{trip.likes}</span>
        </div>
      </div>
    </article>
  )
}

export { TripCard }
