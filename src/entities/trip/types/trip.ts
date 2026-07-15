import type { User } from '@/entities/user'
import type { Country, JoinRequestStatus } from '@/shared/config'
import type { TRANSPORT_OPTIONS } from '@/shared/config'

export type TransportType = typeof TRANSPORT_OPTIONS[number];

export type TripDateRange = {
  from: Date;
  to: Date;
};

export type TripCountry = {
  code: Country['code'];
  plan?: string;
}

export interface Trip {
  id: string;
  user: User;
  tags: string;
  transport: TransportType[];
  companions: number;
  duration: number;
  hasChildren: boolean;
  dates: TripDateRange;
  countries: TripCountry[];
  likes: number;
  createdAt: string;
  joinStatus?: JoinRequestStatus;
}
