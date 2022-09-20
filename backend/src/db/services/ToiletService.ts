import { ICoordinates } from '../../api/interfaces/coordinates.interface';
import { DataNotFoundError } from '../../errors/Errors';
import * as toiletDataAccess from '../data_access/toilet/toilet';
import { GetAllToiletsFilters } from '../data_access/toilet/types';
import { IToiletInput, IToiletOutput } from '../models/Toilet';

export const create = (payload: IToiletInput): Promise<IToiletOutput> => {
  return toiletDataAccess.create(payload);
};

export const update = (
  id: string,
  payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
  return toiletDataAccess.update(id, payload);
};

export const deleteById = (id: string): Promise<boolean> => {
  return toiletDataAccess.deleteById(id);
};

export const getById = (id: string): Promise<IToiletOutput> => {
  return toiletDataAccess.getById(id);
};

export const getAll = (
  filters: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
  return toiletDataAccess.getAll(filters);
};

export const getAllNeighbouringToilets = (
  coordinates: ICoordinates,
  userId?: string
): Promise<IToiletOutput[]> => {
  return toiletDataAccess.getAllNeighbouringToiletsByCoordinates(
    coordinates,
    userId
  );
};

export const getRank = async (
  id: string
): Promise<{
  toilet: IToiletOutput;
  rank: number;
  percentageBeat: number;
  count: number;
}> => {
  const { toilets, count } =
    await toiletDataAccess.getToiletsOrderByCleanlinessDesc();
    let cleanliness = Number.MIN_SAFE_INTEGER;
    let toilet;

    for (let i = 0; i < count; i++) {
      const curr = toilets[i];

      // Find toilet
      if (curr.id === id) {
        toilet = curr;
        cleanliness = curr.cleanliness;
        continue;
      }

      // Find next toilet with lower cleanliness
      if (curr.cleanliness < cleanliness) {
        const percentageBeat = ((count - i) / count) * 100;
        return {
          toilet: curr,
          rank: i,
          percentageBeat: Number(percentageBeat.toFixed(1)),
          count,
        };
      }
    }

    if (toilet == null) {
      throw new DataNotFoundError(`Toilet with ${id} not found`);
    }

    return {
      toilet,
      rank: count,
      percentageBeat: 0,
      count: count,
    };
};
