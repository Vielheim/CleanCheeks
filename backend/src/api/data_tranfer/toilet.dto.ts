import { Optional } from 'sequelize';
import { ToiletType, Utilities } from '../../enums';

export type CreateToiletDTO = {
  id: number;
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
};

export type UpdateToiletDTO = Optional<
  CreateToiletDTO,
  | 'building'
  | 'description'
  | 'floor'
  | 'longitude'
  | 'latitude'
  | 'picture'
  | 'num_seats'
  | 'num_squats'
  | 'cleanliness'
  | 'type'
  | 'utilities'
>;

// TODO update filtersDTO
export type FilterToiletsDTO = {};
