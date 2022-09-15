import { GetAllToiletsFilters } from '../../../db/data_access/types';
import Toilet, { IToiletInput, IToiletOutput } from '../../../db/models/Toilet';
import { ToiletType, Utilities } from '../../../enums';
import {
  CreateToiletDTO,
  UpdateToiletDTO,
  FilterToiletsDTO,
} from '../../data_transfer/toilet/toilet.dto';
import { IToilet } from '../../interfaces';

// maps data from db layer to api layer
export const toToilet = ({
  id,
  building,
  description,
  floor,
  longitude,
  latitude,
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
    num_seats,
    num_squats,
    cleanliness,
    type: mappedType,
    utilities: mappedUtilities,
  };
};

// Map FilterToiletsDTO to GetAllToiletFilters if filters exist
export const toGetAllToiletFilters = ({
  type,
  utilities,
}: FilterToiletsDTO): GetAllToiletsFilters => {
  const getAllToiletFilters: GetAllToiletsFilters = {};

  if (type) {
    getAllToiletFilters.type = type.map((type) => (<any>ToiletType)[type]);
  }

  if (utilities) {
    getAllToiletFilters.utilities = utilities.map(
      (utility) => (<any>Utilities)[utility]
    );
  }

  return getAllToiletFilters;
};
