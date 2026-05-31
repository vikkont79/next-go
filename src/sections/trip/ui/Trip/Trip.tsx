import { getTripById } from '@/entities/trip/api/get-current-trip';
import { UserInfo } from '@/entities/user';
import { Icon, Button, CountryFlag, Link, Modal } from '@/shared/ui'
import styles from './Trip.module.css'
import { getCountryByCode } from '@/shared/lib/get-country-data';
import { TRANSPORT_OPTIONS } from '@/shared/config';
import { getCurrentUser } from '@/shared/api/get-current-user';
import { DeleteTrip } from '@/entities/trip/ui';

interface TripPageProps {
  id: string;
}

const TripPage = async ({ id }: TripPageProps) => {
  const trip = await getTripById(id)
  const currentUser = await getCurrentUser()
  const isOwner = currentUser?.id === trip?.user.id

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
        <p>Компания - {trip.companions} человека</p>
        <p>Длительность - {trip.duration} дней</p>
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
      <section className={styles.actions}>
        {isOwner && (
          <Button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            variant='transparent'
            size='large'
            commandfor='delete-modal'
            command='show-modal'
          >
            Удалить маршрут
          </Button>
        )}
        <Modal id='delete-modal' labelledBy='delete-modal-title'>
          <DeleteTrip tripId={id} />
        </Modal>
      </section>
    </main >
  )
}

export { TripPage }
