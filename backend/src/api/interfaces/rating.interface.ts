import { RatingType } from '../../enums/ToiletRatingEnums';

export interface IRating {
  id: string;
  user_id: string;
  toilet_id: string;
  type: RatingType;
  createdAt: Date;
  updatedAt: Date;
}
