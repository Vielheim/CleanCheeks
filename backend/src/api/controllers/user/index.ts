import * as service from '../../../db/services/UserService';
import { CreateUserDTO } from '../../data_transfer/user/user.dto';
import { IUser } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateUserDTO): Promise<IUser> => {
  const userOutput = await service.create({ ...payload });
  return mapper.toUser(userOutput);
};

export const deleteById = async (id: string): Promise<boolean> => {
  return await service.deleteById(id);
};

export const getById = async (id: string): Promise<IUser> => {
  const userOutput = await service.getById(id);
  return mapper.toUser(userOutput);
};

export const getAll = async (): Promise<IUser[]> => {
  return (await service.getAll()).map(mapper.toUser);
};