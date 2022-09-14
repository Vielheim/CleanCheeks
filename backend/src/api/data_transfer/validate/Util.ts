import { ICoordinates } from '../../interfaces/coordinates.interface';

export const validate = (isValidated: boolean, message: string) => {
  if (!isValidated) {
    throw Error(message);
  }
};

export const validateCoordinates = (coordinates: ICoordinates) => {
  const isValidated = !!coordinates.longitude && !!coordinates.latitude;

  validate(
    isValidated,
    'The longitude and latitude of a coordinate must be present!'
  );
};
