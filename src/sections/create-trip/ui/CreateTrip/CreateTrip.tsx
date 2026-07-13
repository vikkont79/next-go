import { UserInfo } from '@/entities/user'
import { CreateTripForm } from '../CreateTripForm/CreateTripForm'
import styles from './CreateTrip.module.css'



const CreateTripPage = async () => {

  return (
    <main className='wrapper'>
      <h1 className='visually-hidden'>Страница создания маршрута</h1>
      <UserInfo className={styles.user} />
      <CreateTripForm />
    </main>
  )
}

export { CreateTripPage }
