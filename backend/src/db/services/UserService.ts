import { IUserInput, IUserOutput } from '../models/User';
import * as userDataAccess from '../data_access/user';

export const create = (payload: IUserInput): Promise<IUserOutput> => {
  return userDataAccess.create(payload);
};

export const update = (
  id: string,
  payload: Partial<IUserInput>
): Promise<IUserOutput> => {
  return userDataAccess.update(id, payload);
};

export const deleteById = (id: string): Promise<boolean> => {
  return userDataAccess.deleteById(id);
};

export const getById = (id: string): Promise<IUserOutput> => {
  return userDataAccess.getById(id);
};
