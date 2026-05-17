import { countries, TRANSPORT_OPTIONS } from '@/shared/config'
import { Trip } from '../../types/trip'
import Image from 'next/image'
import { Level, Icon, Button, IconButton, Avatar, CountryFlag } from '@/shared/ui'
import styles from './TripCard.module.css'
import { getCountryByCode } from '@/shared/lib/get-country-data'

interface TripCardProps {
  trip: Trip;
  className: string;
}

const TripCard = ({ trip, className }: TripCardProps) => {
  const avatarSrc = trip.user.avatar || '/icons/unknown-raccoon.svg'
  return (
    <article className={`${styles.card} ${className || ''}.trim()`}>
      <div className={styles.avatar}>
        <Avatar
          src={avatarSrc}
          alt={`Аватар ${trip.user.name}`}
        />
      </div>
      <p className={styles.name}>{trip.user.name}</p>
      <div className={styles.tags}>
        {trip.tags.split(' ').map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.call}
          href='#'
        >
          Позвать!
        </Button>
        <IconButton
          className={styles.likeButton}
          icon='heart'
          iconLabel='Избранное'
        />
        <span className={styles.likeQty}>{trip.likes}</span>
      </div>
      <ul className={styles.countries}>
        {trip.countries.map(c => {
          const country = getCountryByCode(c.code)
          return (
            <li key={country?.code}>
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
    </article>
  )
}

export { TripCard }
