import { ToiletType, Utilities } from '../../../enums';

export interface GetAllToiletsFilters {
  type?: ToiletType[];
  utilities?: Utilities[];
}

export const isEmptyGetAllToiletFilters = (
  filters: GetAllToiletsFilters
): boolean => {
  return !filters.type && !filters.utilities;
};
