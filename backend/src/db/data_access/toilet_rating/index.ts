import { DataNotFoundError } from '../../../errors/Errors';
import ToiletRating, {
  IToiletRatingInput,
  IToiletRatingOutput,
} from '../../models/ToiletRating';

export const create = async (
  payload: IToiletRatingInput
): Promise<IToiletRatingOutput> => {
  return await ToiletRating.create(payload);
};

export const getAll = async (): Promise<IToiletRatingOutput[]> => {
  return await ToiletRating.findAll();
};

export const getUserLastRated = async (
  toilet_id: string,
  user_id: string
): Promise<IToiletRatingOutput | null> => {
  const rating = await ToiletRating.findOne({
    where: {
      toilet_id: toilet_id,
      user_id: user_id,
    },
    order: [['createdAt', 'DESC']],
  });

  return rating;
};
