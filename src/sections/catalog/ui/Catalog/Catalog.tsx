import { getAllTrips } from '@/shared/lib/get-all-trips'
import styles from './Catalog.module.css'
import { TripCard } from '@/entities/trip'


const CatalogPage = async () => {
  const trips = await getAllTrips()

  if (trips.length === 0) {
    return <div>Пока нет ни одного маршрута</div>
  }
  return (
    <main>
      <div className={`${styles.catalog} wrapper`}>
        <h1 className='visually-hidden'>Каталог маршрутов</h1>
        <div className={styles.list}>
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </main>
  )
}

export { CatalogPage }
