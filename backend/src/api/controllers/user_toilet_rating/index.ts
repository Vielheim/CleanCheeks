import * as service from '../../../db/services/ToiletRatingService';
import { CreateRatingDTO } from '../../data_transfer/user_toilet_rating/rating.dto';
import { validateCreateRatingDTO } from '../../data_transfer/user_toilet_rating/validateDTO';
import { IRating } from '../../interfaces/rating.interface';
import * as mapper from './mapper';

export const create = async (payload: CreateRatingDTO): Promise<IRating> => {
  validateCreateRatingDTO(payload);

  const ratingInput = mapper.toIToiletRatingInput(payload);
  const result = await service.create(ratingInput);
  return mapper.toIRatingOutput(result);
};

export const getAll = async (): Promise<Array<IRating>> => {
  return (await service.getAll()).map(mapper.toIRatingOutput);
};
