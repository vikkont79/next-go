import { UserInfo } from '@/entities/user'
import { CreateTripForm } from '../CreateTripForm/CreateTripForm'
import styles from './CreateTrip.module.css'



const CreateTripPage = async () => {

  return (
    <main>
      <h1 className='visually-hidden'>Страница создания маршрута</h1>
      <UserInfo
        className={styles.user}
        href='/profile'
      />
      <CreateTripForm />
    </main>
  )
}

export { CreateTripPage }
