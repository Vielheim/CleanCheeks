import { IUserOutput } from '../../../db/models/User';
import { IUser } from '../../interfaces/user.interface';

// maps data from db layer to api layer
export const toUser = ({ id, createdAt, updatedAt }: IUserOutput): IUser => {
  return {
    id,
    createdAt,
    updatedAt,
  };
};
