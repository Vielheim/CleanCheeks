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

export const getAll = async (): Promise<IToiletRatingOutput[]> => {
  return await db.getAll();
};
