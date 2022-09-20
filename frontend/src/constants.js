import { ToiletType, Utilities } from './enums/ToiletEnums';

export const TOILET_RATING = {
  CLEAN: 'CLEAN',
  DIRTY: 'DIRTY',
};

export const OFFLINE_TOILETS = [
  {
    building: 'BIZ1',
    description: 'Behind the air-con units',
    floor: 1,
    latitude: 1.2924024167154038,
    longitude: 103.77438630260782,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'WATERCOOLER'],
  },
  {
    building: 'BIZ1',
    description: 'Behind the vending machines',
    floor: 2,
    latitude: 1.2924024167154038,
    longitude: 103.77438630260782,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS'],
  },
  {
    building: 'BIZ1',
    description: 'Beside the library',
    floor: 3,
    latitude: 1.2924024167154038,
    longitude: 103.77438630260782,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'WATERCOOLER'],
  },
  {
    building: 'BIZ1',
    description: 'Beside the library',
    floor: 3,
    latitude: 1.2924024167154038,
    longitude: 103,
    num_seats: 3,
    num_squats: 3,
    cleanliness: 0,
    type: 'MALE',
    utilities: ['FRAGRANCE', 'BIDETS', 'WATERCOOLER'],
  },
];

export const INITIAL_FILTER_STATE = {
  search: 'UT-AUD1',
  types: [ToiletType.MALE, ToiletType.FEMALE],
  utilities: [Utilities.BIDETS],
};

export const ACCESS_TOKEN_KEY = 'accessToken';
export const USER_ID_KEY = 'userId';
