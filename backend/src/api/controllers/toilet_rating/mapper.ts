import {
  IToiletRatingInput,
  IToiletRatingOutput,
} from '../../../db/models/ToiletRating';
import { RatingType } from '../../../enums/ToiletRatingEnums';
import { CreateRatingDTO } from '../../data_transfer/toilet_rating/rating.dto';
import { IRating } from '../../interfaces/rating.interface';
import { addMinutes } from 'date-fns';
import { TOILET_RATING_COOLDOWN_MINUTES } from '../../../constants';

// Map CreateRatingDTO to IToiletRatingInput
export const toIToiletRatingInput = (
  ratingDTO: CreateRatingDTO
): IToiletRatingInput => {
  return {
    ...ratingDTO,
    type: (<any>RatingType)[ratingDTO.type.toUpperCase()],
  };
};

export const toIRating = ({
  id,
  toilet_id,
  user_id,
  type,
  createdAt,
  updatedAt,
}: IToiletRatingOutput): IRating => {
  const nextRatingTime = addMinutes(createdAt, TOILET_RATING_COOLDOWN_MINUTES);

  return {
    id,
    toilet_id,
    user_id,
    type,
    createdAt,
    updatedAt,
    nextRatingTime,
  };
};
