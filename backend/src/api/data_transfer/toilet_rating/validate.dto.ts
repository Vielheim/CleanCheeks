import { RatingType } from '../../../enums/ToiletRatingEnums';
import { validate } from '../validate/Util';
import { CreateRatingDTO, QueryRatingDTO } from './rating.dto';

export const validateCreateRatingDTO = (payload: CreateRatingDTO) => {
  validateToiletType(payload.type);
};

const validateToiletType = (type: string) => {
  const isValidated = (<any>RatingType)[type.toUpperCase()] !== undefined;
  validate(
    isValidated,
    `type ${type} must be one of ${Object.keys(RatingType)}`
  );
};

export const validateQueryRatingDTO = (payload: QueryRatingDTO) => {
  const isValidated = !!payload.toilet_id && !!payload.user_id;
  validate(
    isValidated,
    `toilet_id and user_id must be provided! Found toilet_id: ${payload.toilet_id}, user_id: ${payload.user_id}`
  );
};
