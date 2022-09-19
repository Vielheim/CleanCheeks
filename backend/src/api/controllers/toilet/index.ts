import { GetAllToiletsFilters } from '../../../db/data_access/toilet/types';
import * as service from '../../../db/services/ToiletService';
import {
  CreateToiletDTO,
  FilterToiletsDTO,
  UpdateToiletDTO,
} from '../../data_transfer/toilet/toilet.dto';
import {
  validateCreateToiletDTO,
  validateFilterToiletsDTO,
  validateUpdateToiletDTO,
} from '../../data_transfer/toilet/validate.dto';
import { validateCoordinates } from '../../data_transfer/validate/Util';
import { IToilet } from '../../interfaces';
import { ICoordinates } from '../../interfaces/coordinates.interface';
import { IToiletRank } from '../../interfaces/toilet.interface';
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
  // validate or throw error
  validateFilterToiletsDTO(filters);

  const getAllToiletFilters: GetAllToiletsFilters =
    mapper.toGetAllToiletFilters(filters);
  return (await service.getAll(getAllToiletFilters)).map(mapper.toToilet);
};

export const getAllNeighbouringToilets = async (
  coordinates: ICoordinates,
  userId?: string
): Promise<IToilet[]> => {
  // validate or throw error
  validateCoordinates(coordinates);

  return (await service.getAllNeighbouringToilets(coordinates, userId)).map(
    mapper.toToilet
  );
};

export const getRank = async (id: string): Promise<IToiletRank> => {
  const { toilet, rank, percentageBeat, count } = await service.getRank(id);
  return {
    toilet: mapper.toToilet(toilet),
    rank: rank,
    percentageBeat: percentageBeat,
    toiletCount: count,
  };
};
