import { PreferenceType } from '../../enums/UserToiletPreferenceEnums';
import * as db from '../data_access/user_toilet_preference';
import {
  IUserToiletPreferenceOutput,
  IUserToiletPreferenceInput,
} from '../models/UserToiletPreference';

export const favouriteToilet = async (
  payload: IUserToiletPreferenceInput
): Promise<IUserToiletPreferenceOutput> => {
  return await db.upsert(payload);
};

export const unfavouriteToilet = async (
  payload: IUserToiletPreferenceInput
): Promise<boolean> => {
  return await db.remove(payload);
};

export const blacklistToilet = async (
  payload: IUserToiletPreferenceInput
): Promise<IUserToiletPreferenceOutput> => {
  return await db.upsert(payload);
};

export const unblacklistToilet = async (
  payload: IUserToiletPreferenceInput
): Promise<boolean> => {
  return await db.remove(payload);
};

export const queryByUserId = async (
  user_id: string
): Promise<Array<IUserToiletPreferenceOutput>> => {
  return await db.queryByUserId(user_id);
};
