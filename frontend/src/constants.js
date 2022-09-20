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
  types: Object.keys(ToiletType),
  utilities: Object.keys(Utilities),
};

export const ACCESS_TOKEN_KEY = 'accessToken';
export const USER_ID_KEY = 'userId';

export const TOILET_QUOTES = {
  GOOD: [
    '10/10 would take a dump here again',
    'Rejuvenating poop',
    'So clean, I could see my reflection on the floor!',
    'I felt like royalty doing my business here',
    'This toilet is A for Amazing',
  ],
  BAD: [
    'The floor was so wet, I thought I was in a wet market',
    "There were no pests here because even pests don't want to enter this toilet",
    "Only if you're feeling adventurous",
    'Tell my mom I love her...',
    'This toilet is A for Abysmal',
  ],
  AVERAGE: [
    'Okay la, so-so lor',
    'Just a toilet like every other toilet',
    'Average, just like my CAP',
    "Doesn't feel too bad to poop here",
    'This toilet is A for Average',
  ],
};

export const TOILET_CLEANLINESS_METADATA = {
  GOOD: {
    text: 'GOOD',
    type: 'success',
    icon: '',
    quote: TOILET_QUOTES.GOOD[0],
  },
  BAD: {
    text: 'BAD',
    type: 'danger',
    icon: '',
    quote: TOILET_QUOTES.BAD[0],
  },
  AVERAGE: {
    text: 'AVERAGE',
    type: 'warning',
    icon: '',
    quote: TOILET_QUOTES.AVERAGE[0],
  },
};
