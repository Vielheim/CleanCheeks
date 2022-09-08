import * as toiletDataAccess from '../data_access/toilet';
import { GetAllToiletsFilters } from '../data_access/types';
import { IToiletInput, IToiletOutput } from '../models/Toilet';

export const create = (payload: IToiletInput): Promise<IToiletOutput> => {
  return toiletDataAccess.create(payload);
};

export const update = (
  id: number,
  payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
  return toiletDataAccess.update(id, payload);
};

export const deleteById = (id: number): Promise<boolean> => {
  return toiletDataAccess.deleteById(id);
};

export const getById = (id: number): Promise<IToiletOutput> => {
  return toiletDataAccess.getById(id);
};

export const getAll = (
  filters?: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
  return toiletDataAccess.getAll(filters);
};
