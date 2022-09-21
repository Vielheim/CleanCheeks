import { ToiletType, Utilities } from '../../../enums';
import { validate } from '../validate/Util';
import { FilterToiletsDTO } from './toilet.dto';

const validateNonEmptyArray = (array_name: string, array: Array<any>) => {
  if (!array.length) {
    throw Error(`${array_name} must not be empty!`);
  }
};

const validateToiletType = (type: string) => {
  const isValidated = (<any>ToiletType)[type] !== undefined;
  validate(
    isValidated,
    `type ${type} must be one of: ${Object.keys(ToiletType)}`
  );
};

const validateUtilities = (utilities: string[]) => {
  utilities.forEach((utility) => {
    const isValidated = (<any>Utilities)[utility] !== undefined;
    validate(
      isValidated,
      `Utility ${utility} must be one of: ${Object.keys(Utilities)}`
    );
  });
};

// Filters must be non-empty and are the correct type
export const validateFilterToiletsDTO = (payload: FilterToiletsDTO) => {
  if (payload.type) {
    validateNonEmptyArray('type', payload.type);

    payload.type.forEach((type) => {
      validateToiletType(type);
    });
  }

  if (payload.utilities) {
    validateNonEmptyArray('utilities', payload.utilities);
    validateUtilities(payload.utilities);
  }
};
