import { User } from '../../models';
import { IUserInput, IUserOutput } from '../../models/User';
import { queryUserBy } from './util';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
  return await User.create(payload);
};

export const getById = async (id: string): Promise<IUserOutput> => {
  const user = await queryUserBy(id);

  return user;
};
