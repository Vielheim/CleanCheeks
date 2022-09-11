import { Optional } from 'sequelize';

export type CreateToiletDTO = {
  building: string;
  description: string;
  floor: number;
  longitude: number;
  latitude: number;
  picture?: Blob;
  num_seats: number;
  num_squats: number;
  cleanliness: number;
  type: string;
  utilities: string[];
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

export type FilterToiletsDTO = {
  type?: string[];
  utilities?: string[];
};
