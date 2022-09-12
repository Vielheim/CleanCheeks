import { IUserToiletPreferenceOutput } from '../../../db/models/UserToiletPreference';
import * as service from '../../../db/services/UserToiletPreferenceService';
import * as mapper from './mapper';

export const favouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<IUserToiletPreferenceOutput> => {
  return await service.favouriteToilet(
    mapper.toFavouriteToiletInput(user_id, toilet_id)
  );
};

export const unfavouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await service.unfavouriteToilet(
    mapper.toFavouriteToiletInput(user_id, toilet_id)
  );
};

export const blacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<IUserToiletPreferenceOutput> => {
  return await service.blacklistToilet(
    mapper.toBlacklistToiletInput(user_id, toilet_id)
  );
};

export const unblacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await service.unblacklistToilet(
    mapper.toBlacklistToiletInput(user_id, toilet_id)
  );
};

export const getByUserId = async (
  user_id: string
): Promise<Array<IUserToiletPreferenceOutput>> => {
  return await service.queryByUserId(user_id);
};
