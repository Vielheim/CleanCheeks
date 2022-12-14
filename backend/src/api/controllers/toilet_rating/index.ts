import * as service from '../../../db/services/ToiletRatingService';
import {
  CreateRatingDTO,
  QueryRatingDTO,
} from '../../data_transfer/toilet_rating/rating.dto';
import {
  validateCreateRatingDTO,
  validateQueryRatingDTO,
} from '../../data_transfer/toilet_rating/validate.dto';
import { IRating } from '../../interfaces/rating.interface';
import * as mapper from './mapper';

export const create = async (payload: CreateRatingDTO): Promise<IRating> => {
  validateCreateRatingDTO(payload);

  const ratingInput = mapper.toIToiletRatingInput(payload);
  const result = await service.create(ratingInput);
  return mapper.toIRating(result);
};

export const getUserLastRated = async (
  payload: QueryRatingDTO
): Promise<IRating | null> => {
  validateQueryRatingDTO(payload);

  const ratingOutput = await service.getUserLastRated(
    payload.toilet_id,
    payload.user_id
  );

  if (ratingOutput == null) {
    return null;
  }

  return mapper.toIRating(ratingOutput);
};
