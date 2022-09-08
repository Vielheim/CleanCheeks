import { IUserOutput } from '../../../db/models/User';
import { IUser } from '../../interfaces';

// maps data from db layer to api layer
export const toUser = ({
  id,
  blacklisted_toilets,
  favourited_toilets,
  createdAt,
  updatedAt,
}: IUserOutput): IUser => {
  return {
    id,
    blacklisted_toilets,
    favourited_toilets,
    createdAt,
    updatedAt,
  };
};
