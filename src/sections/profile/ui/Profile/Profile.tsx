import { getUserById } from '@/entities/user/api'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { User, UserInfo } from '@/entities/user'
import { EditingInfo } from '../EditingInfo/EditingInfo'
import { getUserTrips } from '@/entities/trip/api'
import { Trip, TripCard } from '@/entities/trip'
import styles from './Profile.module.css'

interface ProfilePageProps {
  userId?: string | undefined;
}

const ProfilePage = async ({ userId }: ProfilePageProps) => {
  console.log('=== ProfilePage RENDER ===')
  console.log('userId prop:', userId)
  console.log('userId type:', typeof userId)

  let currentUser: User | null = null
  let targetUser: User | null = null
  let trips: Trip[] = []

  let authError: Error | null = null
  let userError: Error | null = null
  let tripsError: Error | null = null

  try {
    console.log('ProfilePage: calling getCurrentUser()...')
    currentUser = await getCurrentUser()
    console.log('ProfilePage: getCurrentUser() returned:', currentUser ? 'USER' : 'null')
  } catch (error) {
    currentUser = null
    console.error("ProfilePage: Failed to fetch current user", error)
    authError = error instanceof Error ? error : new Error('Unknown auth error')
  }

  console.log('ProfilePage: currentUser after call:', currentUser ? currentUser.id : 'null')

  if (userId) {
    console.log('ProfilePage: userId exists, fetching by id')
    try {
      targetUser = await getUserById(userId)
    } catch (error) {
      targetUser = null
      console.error(`ProfilePage: Failed to fetch user by id ${userId}`, error)
      userError = error instanceof Error ? error : new Error('Unknown user fetch error')
    }
  } else {
    console.log('ProfilePage: userId is falsy, setting targetUser = currentUser')
    targetUser = currentUser
  }

  console.log('ProfilePage: targetUser final:', targetUser ? targetUser.id : 'null')

  if (authError) {
    return <div className='error'>Ошибка при загрузке данных профиля. Пожалуйста, обновите страницу.</div>;
  }

  if (userError) {
    return <div className='error'>Не удалось загрузить данные пользователя. Попробуйте позже.</div>;
  }

  if (!targetUser) {
    console.log('ProfilePage: targetUser is null, showing "Пользователь не найден"')
    return <div className='error'> Пользователь не найден</div>;
  }

  const user = targetUser
  const isOwner = !userId

  try {
    trips = await getUserTrips(user.id)
  } catch (error) {
    console.error('Failed to load user trips:', error)
    tripsError = error instanceof Error ? error : new Error('Unknown error')
  }


  return (
    <main className={`${styles.profile} wrapper`} >
      <h1 className='visually-hidden'>Страница профиля пользователя</h1>
      <UserInfo className={styles.user} user={user} />
      <EditingInfo user={user} isOwner={isOwner} />
      {tripsError ? (
        <div>Ошибка загрузки маршрутов</div>
      ) : trips.length > 0 && (
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
