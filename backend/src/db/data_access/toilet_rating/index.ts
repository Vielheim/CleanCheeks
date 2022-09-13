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
