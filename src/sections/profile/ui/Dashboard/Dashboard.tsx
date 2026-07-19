import { JoinRequest, RequestCard } from '@/entities/join-request'
import styles from './Dashboard.module.css'
import { Trip } from '@/entities/trip'
import { TripCard } from '@/widgets/trip-card'
import { getOwnerJoinRequests } from '@/entities/join-request/api/get-join-requests'
import { getUserJoinRequests } from '@/entities/join-request/api/get-my-join-requests'
import { User } from '@/entities/user'

interface DashboardProps {
  className?: string;
  user: User;
}

const Dashboard = async ({ className, user }: DashboardProps) => {
  let requests: JoinRequest[] = []
  let myRequests: Trip[] = []

  let requestsError: Error | null = null
  let myRequestsError: Error | null = null

  try {
    requests = await getOwnerJoinRequests(user)
  } catch (error) {
    console.error('ProfilePage: Failed to fetch join requests', error)
    requestsError = error instanceof Error ? error : new Error('Unknown error')
  }

  try {
    myRequests = await getUserJoinRequests(user)
  } catch (error) {
    console.error('ProfilePage: Failed to fetch my join requests', error)
    myRequestsError = error instanceof Error ? error : new Error('Unknown error')
  }

  return (
    <section className={styles.dashboard}>
      {requestsError ? (
        <div className={styles.empty}>
          <p>Не удалось загрузить список входящих заявок</p>
        </div>
      ) : requests.length > 0 && (
        <>
          <h2 className={styles.title}>Входящие заявки ({requests.length})</h2>
          <ul className={styles.list}>
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
              />
            ))}
          </ul>
        </>
      )}
      {myRequestsError ? (
        <div className={styles.empty}>
          <p>Не удалось загрузить список ваших заявок</p>
        </div>
      ) : myRequests.length > 0 && (
        <>
          <h2 className={styles.title}>Мои заявки ({myRequests.length})</h2>
          <ul className={styles.list}>
            {myRequests.map((request) => (
              <TripCard
                key={request.id}
                trip={request}
                initialStatus={request.joinStatus}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export { Dashboard }
