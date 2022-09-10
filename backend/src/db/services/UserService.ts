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

export const getAll = (): Promise<IUserOutput[]> => {
  return userDataAccess.getAll();
};

export const favouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await userDataAccess.favouriteToilet(user_id, toilet_id);
};

export const unfavouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await userDataAccess.unfavouriteToilet(user_id, toilet_id);
};

export const blacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await userDataAccess.blacklistToilet(user_id, toilet_id);
};

export const unblacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  return await userDataAccess.unblacklistToilet(user_id, toilet_id);
};
