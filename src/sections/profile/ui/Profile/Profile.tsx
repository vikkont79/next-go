import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import { EditingInfo } from '../EditingInfo/EditingInfo'
import { getUserById } from '@/shared/lib/get-user-by-id'
import { getUserTrips } from '@/shared/lib/get-user-trips'
import { TripCard } from '@/entities/trip'
import styles from './Profile.module.css'

interface ProfilePageProps {
  userId?: string | undefined;
}

const ProfilePage = async ({ userId }: ProfilePageProps) => {
  const user = userId ? await getUserById(userId) : await getCurrentUser()

  if (!user) return <div>Пользователь не найден</div>

  const isOwner = !userId
  const trips = await getUserTrips(user.id)

  return (
    <main className={`${styles.profile} wrapper`} >
      <h1 className='visually-hidden'>Страница профиля пользователя</h1>
      <UserInfo className={styles.user} user={user} />
      <EditingInfo user={user} isOwner={isOwner} />
      {trips.length > 0 && (
        <section className={styles.trips}>
          <h2 className={styles.tripsTitle}>
            {isOwner ? 'Мои маршруты' : `Маршруты пользователя ${user.name}`}
          </h2>
          <div className={styles.list}>
            {trips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>
      )}
    </main >
  )
}

export { ProfilePage }
