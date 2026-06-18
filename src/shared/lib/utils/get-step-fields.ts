import { TripFormData } from '../validation'

export const getStepFields = (step: number): (keyof TripFormData)[] => {
  switch (step) {
    case 1:
      return ['tags', 'transport', 'companions', 'duration']
    case 2: return ['tags', 'transport', 'countries']
    default:
      return []
  }
}
