import { ICoordinates } from '../../api/interfaces/coordinates.interface';
import { DataNotFoundError } from '../../errors/Errors';
import * as toiletDataAccess from '../data_access/toilet/toilet';
import { IToiletOutput } from '../models/Toilet';

export const getAllNeighbouringToilets = async (
  coordinates: ICoordinates,
  userId?: string
): Promise<IToiletOutput[]> => {
  return await toiletDataAccess.getAllNeighbouringToiletsByCoordinates(
    coordinates,
    userId
  );
};

export const getToiletsWithUserPreferences = async (
  userId: string
): Promise<IToiletOutput[]> => {
  return await toiletDataAccess.getToiletsWithUserPreferences(userId);
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
      if (toilet == null) {
        throw new DataNotFoundError(`Toilet with ${id} not found`);
      }
      return {
        toilet,
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
