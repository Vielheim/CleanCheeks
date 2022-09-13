import { RatingType } from '../../../enums/ToiletRatingEnums';
import { validate } from '../validate/Util';
import { CreateRatingDTO } from './rating.dto';

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
