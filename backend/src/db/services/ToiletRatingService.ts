import * as db from '../data_access/toilet_rating';
import {
  IToiletRatingInput,
  IToiletRatingOutput,
} from '../models/ToiletRating';

export const create = async (
  payload: IToiletRatingInput
): Promise<IToiletRatingOutput> => {
  return await db.create(payload);
};

export const getUserLastRated = async (
  toilet_id: string,
  user_id: string
): Promise<IToiletRatingOutput | null> => {
  return await db.getUserLastRated(toilet_id, user_id);
};
