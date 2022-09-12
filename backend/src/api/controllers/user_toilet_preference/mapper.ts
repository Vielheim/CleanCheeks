import { IUserToiletPreferenceInput } from '../../../db/models/UserToiletPreference';
import { PreferenceType } from '../../../enums';

export const toFavouriteToiletInput = (
  user_id: string,
  toilet_id: string
): IUserToiletPreferenceInput => {
  return {
    user_id,
    toilet_id,
    type: PreferenceType.FAVOURITE,
  };
};

export const toBlacklistToiletInput = (
  user_id: string,
  toilet_id: string
): IUserToiletPreferenceInput => {
  return {
    user_id,
    toilet_id,
    type: PreferenceType.BLACKLIST,
  };
};
