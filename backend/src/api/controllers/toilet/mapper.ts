import { IToiletOutput } from '../../../db/models/Toilet';
import { PreferenceType } from '../../../enums';
import { IToilet } from '../../interfaces/toilet.interface';

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
  num_ratings,
  type,
  utilities,
  createdAt,
  updatedAt,
  toiletPreferences,
}: IToiletOutput): IToilet => {
  let user_preference_type: PreferenceType | undefined = undefined;

  // extract the first user's preference
  if (toiletPreferences !== undefined && toiletPreferences?.length > 0) {
    user_preference_type = toiletPreferences[0].type;
  }

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
    num_ratings,
    type,
    utilities,
    createdAt,
    updatedAt,
    user_preference_type,
  };
};
