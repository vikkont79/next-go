import type { User } from '@/entities/user'
import type { TRANSPORT_OPTIONS } from '@/shared/config'

export type TransportType = typeof TRANSPORT_OPTIONS[number];

export type TripDateRange = {
  from: Date;
  to: Date;
};

export type Country = {
  id?: string;
  code: string;
  name_ru: string;
  continent: string;
  plan?: string;
}

export interface Trip {
  id: string;
  user: User;
  tags: string;
  transport: TransportType[];
  companions: number;
  duration: number;
  dates: TripDateRange;
  countries: Country[];
  likes: number;
  createdAt: string;
}
