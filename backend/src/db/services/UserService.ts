import { IUserInput, IUserOutput } from '../models/User';
import * as userDataAccess from '../data_access/user';

export const create = (payload: IUserInput): Promise<IUserOutput> => {
  return userDataAccess.create(payload);
};

export const getById = (id: string): Promise<IUserOutput> => {
  return userDataAccess.getById(id);
};
