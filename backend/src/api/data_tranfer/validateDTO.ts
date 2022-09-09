import { ToiletType, Utilities } from '../../enums';
import { CreateToiletDTO, UpdateToiletDTO } from './toilet.dto';

const validate = (isValidated: boolean, message: string) => {
  if (!isValidated) {
    throw Error(message);
  }
};

// Validate individual fields
const validateNumSeats = (num_seats: number) => {
  const isValidated = 0 <= num_seats && Number.isInteger(num_seats);
  validate(
    isValidated,
    'num_seats should be an integer and greater than or equal to 0'
  );
};

const validateNumSquats = (num_squats: number) => {
  const isValidated = 0 <= num_squats && Number.isInteger(num_squats);
  validate(
    isValidated,
    'num_squats should be an integer and greater than or equal to 0'
  );
};

const validateCleanliness = (cleanliness: number) => {
  const isValidated = -1 <= cleanliness && cleanliness <= 1;
  validate(isValidated, 'cleanliness should be a number between -1 and 1');
};

const validateToiletType = (type: string) => {
  const isValidated = (<any>ToiletType)[type] !== undefined;
  validate(
    isValidated,
    `type ${type} should be one of: ${Object.keys(ToiletType)}`
  );
};

const validateUtilities = (utilities: string[]) => {
  utilities.forEach((utility) => {
    const isValidated = (<any>Utilities)[utility] !== undefined;
    validate(
      isValidated,
      `Utility ${utility} should be one of: ${Object.keys(Utilities)}`
    );
  });
};

// Validation for DTOs
export const validateCreateToiletDTO = (payload: CreateToiletDTO) => {
  validateNumSeats(payload.num_seats);
  validateNumSquats(payload.num_squats);
  validateCleanliness(payload.cleanliness);
  validateToiletType(payload.type);
  validateUtilities(payload.utilities);
};

export const validateUpdateToiletDTO = (payload: UpdateToiletDTO) => {
  if (payload.num_seats) {
    validateNumSeats(payload.num_seats);
  }

  if (payload.num_squats) {
    validateNumSquats(payload.num_squats);
  }

  if (payload.cleanliness) {
    validateCleanliness(payload.cleanliness);
  }

  if (payload.type) {
    validateToiletType(payload.type);
  }

  if (payload.utilities) {
    validateUtilities(payload.utilities);
  }
};
