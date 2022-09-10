import { IToiletInput, IToiletOutput } from '../../../db/models/Toilet';
import { ToiletType, Utilities } from '../../../enums';
import {
  CreateToiletDTO,
  UpdateToiletDTO,
} from '../../data_transfer/toilet.dto';
import { IToilet } from '../../interfaces';

// maps data from db layer to api layer
export const toToilet = ({
  id,
  building,
  description,
  floor,
  longitude,
  latitude,
  picture,
  num_seats,
  num_squats,
  cleanliness,
  type,
  utilities,
  createdAt,
  updatedAt,
}: IToiletOutput): IToilet => {
  return {
    id,
    building,
    description,
    floor,
    longitude,
    latitude,
    picture,
    num_seats,
    num_squats,
    cleanliness,
    type,
    utilities,
    createdAt,
    updatedAt,
  };
};

// Map CreateToiletDTO to IToiletInput
export const toIToiletInput = ({
  building,
  description,
  floor,
  longitude,
  latitude,
  picture,
  num_seats,
  num_squats,
  cleanliness,
  type,
  utilities,
}: CreateToiletDTO): IToiletInput => {
  const mappedType: ToiletType = (<any>ToiletType)[type];
  const mappedUtilities: Utilities[] = utilities.map(
    (utility) => (<any>Utilities)[utility]
  );

  return {
    building,
    description,
    floor,
    longitude,
    latitude,
    picture,
    num_seats,
    num_squats,
    cleanliness,
    type: mappedType,
    utilities: mappedUtilities,
  };
};

// Map UpdateToiletDTO to Partial<IToiletInput>
export const toPartialIToiletInput = ({
  building,
  description,
  floor,
  longitude,
  latitude,
  picture,
  num_seats,
  num_squats,
  cleanliness,
  type,
  utilities,
}: UpdateToiletDTO): Partial<IToiletInput> => {
  let mappedType: ToiletType | undefined;
  if (type !== undefined) {
    mappedType = (<any>ToiletType)[type];
  }

  let mappedUtilities: Utilities[] | undefined;
  if (utilities !== undefined) {
    mappedUtilities = utilities.map((utility) => (<any>Utilities)[utility]);
  }

  return {
    building,
    description,
    floor,
    longitude,
    latitude,
    picture,
    num_seats,
    num_squats,
    cleanliness,
    type: mappedType,
    utilities: mappedUtilities,
  };
};
