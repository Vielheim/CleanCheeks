import * as service from '../../../db/services/ToiletService';
import { PreferenceType } from '../../../enums';
import { validateCoordinates } from '../../data_transfer/validate/Util';
import { IToilet } from '../../interfaces';
import { ICoordinates } from '../../interfaces/coordinates.interface';
import {
  IToiletRank,
  IToiletsWithUserPreferences,
} from '../../interfaces/toilet.interface';
import * as mapper from './mapper';

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

export const getToiletsWithUserPreferences = async (
  userId?: string
): Promise<IToiletsWithUserPreferences> => {
  if (userId == null) {
    return {
      blacklistedToilets: [],
      favouritedToilets: [],
    };
  }
  const toilets = (await service.getToiletsWithUserPreferences(userId)).map(
    mapper.toToilet
  );

  return {
    blacklistedToilets: toilets.filter(
      (toilet) => toilet.user_preference_type === PreferenceType.BLACKLIST
    ),
    favouritedToilets: toilets.filter(
      (toilet) => toilet.user_preference_type === PreferenceType.FAVOURITE
    ),
  };
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
