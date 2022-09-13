import * as db from '../data_access/toilet_preference';
import {
  IToiletPreferenceInput,
  IToiletPreferenceOutput,
} from '../models/ToiletPreference';

export const upsert = async (
  payload: IToiletPreferenceInput
): Promise<[IToiletPreferenceOutput, boolean]> => {
  return await db.upsert(payload);
};

export const deleteByUserIdAndToiletId = async (
  userId: string,
  toiletId: string
): Promise<boolean> => {
  return await db.deleteByToiletIdAndUserId(userId, toiletId);
};

export const queryByUserId = async (
  userId: string
): Promise<Array<IToiletPreferenceOutput>> => {
  return await db.queryByUserId(userId);
};

export const queryAll = async (): Promise<Array<IToiletPreferenceOutput>> => {
  return await db.queryAll();
};
