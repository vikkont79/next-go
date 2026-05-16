import { TripCard } from '@/entities/trip'
import { getTripById } from '@/shared/lib/get-current-trip';

interface TripPageProps {
  id: string;
}

const TripPage = async ({ id }: TripPageProps) => {
  const trip = await getTripById(id)

  if (!trip) {
    return <div>Маршрут не найден</div>
  }

  return (
    <main>
      <TripCard
        trip={trip}
      />
    </main>
  )
}

export { TripPage }
