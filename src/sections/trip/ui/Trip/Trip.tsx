import { TripCard } from '@/entities/trip'
import { getTripById } from '@/shared/lib/get-current-trip';

interface TripPageProps {
  className?: string;
  id: string;
}

const TripPage = async ({ className = '', id }: TripPageProps) => {
  const trip = await getTripById(id)

  if (!trip) {
    return <div>Маршрут не найден</div>
  }

  return (
    <main>
      <TripCard
        className={className}
        trip={trip}
      />
    </main>
  )
}

export { TripPage }
