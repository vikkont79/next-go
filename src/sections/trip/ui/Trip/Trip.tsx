import { getTripById } from '@/entities/trip/api/get-current-trip'
import { User, UserInfo } from '@/entities/user'
import { Icon, Button, CountryFlag, Link, Modal } from '@/shared/ui'
import { getCountryByCode } from '@/shared/lib'
import { TRANSPORT_OPTIONS } from '@/shared/config'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { DeleteTrip } from '@/entities/trip/ui'
import styles from './Trip.module.css'


interface TripPageProps {
  id: string;
}

const TripPage = async ({ id }: TripPageProps) => {
  let trip = null
  let currentUser: User | null = null

  let tripError: Error | null = null
  let authError: Error | null = null

  try {
    trip = await getTripById(id)
  } catch (error) {
    console.error(`TripPage: Failed to fetch trip ${id}`, error)
    tripError = error instanceof Error ? error : new Error('Unknown trip fetch error')
  }

  if (tripError) {
    return <div className='error'>Ошибка загрузки маршрута. Попробуйте позже.</div>
  }

  if (!trip) {
    return <div className='error'>Маршрут не найден</div>
  }

  try {
    currentUser = await getCurrentUser()
  } catch (error) {
    console.error('TripPage: Failed to fetch current user', error)
    authError = error instanceof Error ? error : new Error('Unknown auth error')
  }

  const isOwner = !authError && currentUser?.id === trip.user.id

  return (
    <main className='wrapper'>
      <h1 className='visually-hidden'>Полная информация о маршруте</h1>
      <UserInfo
        className={styles.user}
        targetUser={trip.user}
        href={`/profile/${trip.user.id}`}
      />
      <section className={styles.info}>
        <Link href={`/profile/${trip.user.id}`} className={styles.name}>
          {trip.user.name}
        </Link>
        <h2 className={styles.title}>Детали маршрута</h2>
        <p>Даты: {trip.dates.from.toLocaleDateString()} — {trip.dates.to.toLocaleDateString()}</p>
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
        {trip.hasChildren && (
          <p>Можно с детьми</p>
        )}
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
          authError ? (
            <div>Ошибка загрузки данных пользователя. Элементы управления недоступны. Обновите страницу</div>
          ) : (
            <Button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              variant='transparent'
              size='large'
              commandfor='delete-modal'
              command='show-modal'
            >
              Удалить маршрут
            </Button>
          )
        )}
        <Modal id='delete-modal' labelledBy='delete-modal-title'>
          <DeleteTrip tripId={id} />
        </Modal>
      </section>
    </main >
  )
}

export { TripPage }
