import { DataNotFoundError } from '../../errors/Errors';
import { Toilet } from '../models';
import { IToiletInput, IToiletOutput } from '../models/Toilet';
import { GetAllToiletsFilters, isEmptyGetAllToiletFilters } from './types';
import { Op, Sequelize } from 'sequelize';
import { ICoordinates } from '../../api/interfaces/coordinates.interface';
import injection_container from '../indices/config';
import { NeighbouringToiletsIndex } from '../indices';
import TYPES from '../indices/types';

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

export const getAll = async (
  filters: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
  // No filters specified; return all
  if (isEmptyGetAllToiletFilters(filters)) {
    return Toilet.findAll();
  }

  // Extract existing filters and perform query

  // The ToiletType is in the filters array
  let typesFilter = {};
  if (filters.type) {
    typesFilter = {
      type: {
        [Op.in]: filters.type,
      },
    };
  }

  // One of the Utilities is in in the filters array
  let utilitiesFilter = {};
  if (filters.utilities) {
    utilitiesFilter = {
      utilities: {
        [Op.overlap]: filters.utilities,
      },
    };
  }

  return Toilet.findAll({
    where: Sequelize.or(typesFilter, utilitiesFilter),
  });
};

export const getAllNeighbouringToiletsByCoordinates = async (
  coordinates: ICoordinates
): Promise<IToiletOutput[]> => {
  const toilets = await Toilet.findAll();

  const neighbouringToiletsIndex: NeighbouringToiletsIndex =
    injection_container.get<NeighbouringToiletsIndex>(
      TYPES.NeighbouringToiletsIndex
    );

  const results = await neighbouringToiletsIndex
    .query(coordinates.latitude, coordinates.longitude, coordinates.radius)
    .map((idx) => toilets[idx]);

  return results;
};
