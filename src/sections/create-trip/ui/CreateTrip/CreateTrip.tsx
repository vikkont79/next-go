import { getCurrentUser } from '@/shared/lib/get-current-user'
import { UserInfo } from '@/entities/user'
import styles from './CreateTrip.module.css'
import { CreateTripForm } from '../CreateTripForm/CreateTripForm'



const CreateTripPage = async () => {
  const user = await getCurrentUser()

  return (
    <main className='wrapper'>
      <h1 className='visually-hidden'>Страница создания маршрута</h1>
      <UserInfo className={styles.user} user={user!} />
      <CreateTripForm />
    </main>
  )
}

export { CreateTripPage }
