import { TransportType, TripCountry } from "@/entities/trip"

export interface JoinRequest {
  id: string
  user: {
    id: string
    name: string
    avatar: string | null
  }
  trip: {
    id: string
    countries: TripCountry[]
    transport: TransportType[];
  }
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}
