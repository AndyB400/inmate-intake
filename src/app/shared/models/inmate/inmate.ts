import { LocationHistory } from './location-history';

export interface Inmate {
  id: number;
  firstNames: string;
  lastName: string;
  cellNumber: number;
  intake: Date;
  isActive: boolean;
  locationHistory: LocationHistory[];
}
