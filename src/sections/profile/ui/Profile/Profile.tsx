import { getUserById } from '@/entities/user/api/get-user-by-id'
import { getCurrentUser } from '@/shared/api/get-current-user'
import { User, UserInfo } from '@/entities/user'
import { EditingInfo } from '../EditingInfo/EditingInfo'
import { getUserTrips } from '@/entities/trip/api/get-user-trips'
import { Trip } from '@/entities/trip'
import { TripCard } from '@/widgets/trip-card'
import { Dashboard } from '../Dashboard/Dashboard'
import { JoinRequest } from '@/entities/join-request'
import { getOwnerJoinRequests } from '@/entities/join-request/api/get-join-requests'
import { approveJoinRequest } from '@/entities/join-request/api/approve-join-request'
import { rejectJoinRequest } from '@/entities/join-request/api/reject-join-request'
import styles from './Profile.module.css'

interface ProfilePageProps {
  userId?: string | undefined;
}

const ProfilePage = async ({ userId }: ProfilePageProps) => {
  let currentUser: User | null = null //Текущий авторизованный пользователь
  let targetUser: User | null = null //Пользователь переданный в пропсах
  let trips: Trip[] = []
  let requests: JoinRequest[] = []


  let authError: Error | null = null
  let userError: Error | null = null
  let tripsError: Error | null = null
  let requestsError: Error | null = null

  try {
    currentUser = await getCurrentUser()
  } catch (error) {
    currentUser = null
    console.error("ProfilePage: Failed to fetch current user", error)
    authError = error instanceof Error ? error : new Error('Unknown auth error')
  }

  if (userId) {
    try {
      targetUser = await getUserById(userId)
    } catch (error) {
      targetUser = null
      console.error(`ProfilePage: Failed to fetch user by id ${userId}`, error)
      userError = error instanceof Error ? error : new Error('Unknown user fetch error')
    }
  }

  const user = userId ? targetUser : currentUser

  if (authError) {
    return <div className='error'>Ошибка при загрузке данных профиля. Пожалуйста, обновите страницу.</div>
  }

  if (userError) {
    return <div className='error'>Не удалось загрузить данные пользователя. Попробуйте позже.</div>
  }

  if (!user) {
    return <div className='error'> Пользователь не найден</div>
  }

  try {
    trips = await getUserTrips(user.id, currentUser?.id)
  } catch (error) {
    console.error('Failed to load user trips:', error)
    tripsError = error instanceof Error ? error : new Error('Unknown error')
  }

  const isOwner = !userId

  if (isOwner) {
    try {
      requests = await getOwnerJoinRequests()
    } catch (error) {
      console.error('ProfilePage: Failed to fetch join requests', error)
      requestsError = error instanceof Error ? error : new Error('Unknown error')
    }
  }

  return (
    <main className={`${styles.profile} wrapper`} >
      <h1 className='visually-hidden'>Страница профиля пользователя</h1>
      <UserInfo className={styles.user} targetUser={user} />
      <EditingInfo user={user} isOwner={isOwner} />
      {isOwner && (
        <>
          {requestsError ? (
            <div className="error">
              Ошибка загрузки заявок. Попробуйте позже.
            </div>
          ) : (
            <Dashboard
              requests={requests}
              onApprove={approveJoinRequest}
              onReject={rejectJoinRequest}
            />
          )}
        </>
      )}
      {tripsError ? (
        <div>Ошибка загрузки маршрутов</div>
      ) : trips.length > 0 && (
        <section className={styles.trips}>
          <h2 className={styles.title}>
            {isOwner ? 'Мои маршруты' : `Маршруты пользователя ${user.name}`}
          </h2>
          <ul className={styles.list}>
            {trips.map(trip => (
              <TripCard
                key={trip.id}
                trip={trip}
                initialStatus={trip.joinStatus}
                hideActions={isOwner}
              />
            ))}
          </ul>
        </section>
      )}
    </main >
  )
}

export { ProfilePage }
