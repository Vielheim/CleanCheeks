import { ToiletType, Utilities, PreferenceType } from '../../enums';
export interface IToilet {
  id: string;
  building: string;
  description: string;
  floor: number;
  longitude: number;
  latitude: number;
  num_seats: number;
  num_squats: number;
  cleanliness: number;
  num_ratings: number;
  type: ToiletType;
  utilities: Utilities[];
  createdAt?: Date;
  updatedAt?: Date;
  user_preference_type?: PreferenceType;
}
