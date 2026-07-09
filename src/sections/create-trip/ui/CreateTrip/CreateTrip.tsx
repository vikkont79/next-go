import { getCurrentUser } from '@/shared/api/get-current-user'
import { UserInfo } from '@/entities/user'
import { CreateTripForm } from '../CreateTripForm/CreateTripForm'
import styles from './CreateTrip.module.css'



const CreateTripPage = async () => {
  let user = null
  let error: Error | null = null

  try {
    user = await getCurrentUser()
  } catch (error) {
    console.error('CreateTripPage: Failed to fetch current user', error)
    error = error instanceof Error ? error : new Error('Unknown auth error')
  }

  if (error) {
    return <div className="error">Ошибка загрузки данных пользователя. Невозможно создать маршрут.</div>
  }

  return (
    <main className='wrapper'>
      <h1 className='visually-hidden'>Страница создания маршрута</h1>
      {user && <UserInfo className={styles.user} />}
      <CreateTripForm />
    </main>
  )
}

export { CreateTripPage }
