import * as service from '../../../db/services/ToiletService';
import {
  CreateToiletDTO,
  FilterToiletsDTO,
  UpdateToiletDTO,
} from '../../data_tranfer/toilet.dto';
import {
  validateCreateToiletDTO,
  validateUpdateToiletDTO,
} from '../../data_tranfer/validateDTO';
import { IToilet } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateToiletDTO): Promise<IToilet> => {
  // validate or throw error
  validateCreateToiletDTO(payload);

  const toiletInput = mapper.toIToiletInput(payload);
  const toiletOutput = await service.create(toiletInput);
  return mapper.toToilet(toiletOutput);
};

export const update = async (
  id: string,
  payload: UpdateToiletDTO
): Promise<IToilet> => {
  // validate or throw error
  validateUpdateToiletDTO(payload);

  const partialToiletInput = mapper.toPartialIToiletInput(payload);
  const toiletOutput = await service.update(id, partialToiletInput);
  return mapper.toToilet(toiletOutput);
};

export const deleteById = async (id: string): Promise<boolean> => {
  return await service.deleteById(id);
};

export const getById = async (id: string): Promise<IToilet> => {
  const toiletOutput = await service.getById(id);
  return mapper.toToilet(toiletOutput);
};

export const getAll = async (filters: FilterToiletsDTO): Promise<IToilet[]> => {
  return (await service.getAll(filters)).map(mapper.toToilet);
};
