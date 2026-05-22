import { getTripById } from '@/shared/lib/get-current-trip';
import { UserInfo } from '@/entities/user';
import { Level, Icon, Button, IconButton, Avatar, CountryFlag, Link } from '@/shared/ui'
import styles from './Trip.module.css'
import { getCountryByCode } from '@/shared/lib/get-country-data';
import { TRANSPORT_OPTIONS } from '@/shared/config';

interface TripPageProps {
  id: string;
}

const TripPage = async ({ id }: TripPageProps) => {
  const trip = await getTripById(id)

  if (!trip) {
    return <div>Маршрут не найден</div>
  }

  return (
    <main className='wrapper'>
      <h1 className='visually-hidden'>Полная информация о маршруте</h1>
      <UserInfo
        className={styles.user}
        user={trip.user}
        href={`/profile/${trip.user.id}`}
      />
      <section className={styles.info}>
        <Link href={`/profile/${trip.user.id}`} className={styles.name}>
          {trip.user.name}
        </Link>
        <h2 className={styles.title}>Детали маршрута</h2>
        <div className={styles.tags}>
          {trip.tags.split(' ').map(tag => <span key={tag}>{tag}</span>)}
        </div>
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
        <ul className={styles.countries}>
          {trip.countries.map(c => {
            const country = getCountryByCode(c.code)
            return (
              <li key={country?.code}>
                <div className={styles.country}>
                  <CountryFlag
                    code={c.code}
                    name={country?.name_ru ?? c.code} />
                  <span>
                    {country?.name_ru}
                  </span>
                </div>
                <p className={styles.plan}>{c.plan}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </main >
  )
}

export { TripPage }
