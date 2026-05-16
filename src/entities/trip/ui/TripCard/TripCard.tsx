import { countries } from '@/shared/config';
import { Trip } from '../../types/trip'
import styles from './TripCard.module.css'

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  return (
    <main>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3>{trip.user.name}</h3>
          <div className={styles.tags}>
            {trip.tags.split(' ').map(tag => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className={styles.countries}>
          <span>хочет посетить:</span>
          <div className={styles.countryList}>
            {trip.countries.map(country => {
              const currentCountry = countries.find(c => c.code === country.code);
              return (
                <div key={country.code}>
                  {currentCountry?.name_ru ?? country.code}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main >
  )
}

export { TripCard }
