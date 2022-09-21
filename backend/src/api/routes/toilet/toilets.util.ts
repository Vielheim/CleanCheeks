import { Request } from 'express';
import { ICoordinates } from '../../interfaces/coordinates.interface';

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
