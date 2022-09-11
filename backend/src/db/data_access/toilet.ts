import { DataNotFoundError } from '../../errors/Errors';
import { Toilet } from '../models';
import { IToiletInput, IToiletOutput } from '../models/Toilet';
import { GetAllToiletsFilters } from './types';

export const create = async (payload: IToiletInput): Promise<IToiletOutput> => {
  const toilet = await Toilet.create(payload);
  return toilet;
};

export const update = async (
  id: string,
  payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
  const toilet = await Toilet.findByPk(id);

  if (toilet == null) {
    throw new DataNotFoundError(`Toilet with id ${id} not found!`);
  }

  const updatedToilet = await toilet.update(payload);
  return updatedToilet;
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedToiletCount = await Toilet.destroy({
    where: { id: id },
  });

  return !!deletedToiletCount;
};

export const getById = async (id: string): Promise<IToiletOutput> => {
  const toilet = await Toilet.findByPk(id);

  if (!toilet) {
    throw new DataNotFoundError(`Toilet with id ${id} not found!`);
  }

  return toilet;
};

// TODO update to filter via filters
export const getAll = async (
  filters?: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
  return Toilet.findAll();
};
