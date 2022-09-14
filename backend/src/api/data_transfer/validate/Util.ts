import { ICoordinates } from '../../interfaces/coordinates.interface';

export const validate = (isValidated: boolean, message: string) => {
  if (!isValidated) {
    throw Error(message);
  }
};

export const validateCoordinates = (coordinates: ICoordinates) => {
  const isValidated = !!coordinates.latitude && !!coordinates.longitude;

  validate(
    isValidated,
    'The latitude and longitude of a coordinate must be present! Radius is optional'
  );
};
