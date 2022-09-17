import { FilterToiletsDTO } from '../../data_transfer/toilet/toilet.dto';
import { query, Request } from 'express';
import { ICoordinates } from '../../interfaces/coordinates.interface';

// Extract filters that exist
export const getFilterToiletsDTOFromReq = (req: Request): FilterToiletsDTO => {
  const filters: FilterToiletsDTO = {};
  if (req.query.type) {
    filters.type = JSON.parse(req.query.type as string);
  }

  if (req.query.utilities) {
    filters.utilities = JSON.parse(req.query.utilities as string);
  }

  return filters;
};

export const getCoordinatesFromReq = (req: Request): ICoordinates => {
  const latitude: number = Number(req.query.latitude);
  const longitude: number = Number(req.query.longitude);
  const radius: number = Number(req.query.radius);

  return {
    latitude,
    longitude,
    radius,
  };
};
