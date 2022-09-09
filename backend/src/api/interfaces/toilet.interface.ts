import { ToiletType, Utilities } from '../../enums';
export interface IToilet {
  id: string;
  building: string;
  description: string;
  floor: number;
  longitude: number;
  latitude: number;
  picture?: Blob;
  num_seats: number;
  num_squats: number;
  cleanliness: number;
  type: ToiletType;
  utilities: Utilities[];
  createdAt?: Date;
  updatedAt?: Date;
}
