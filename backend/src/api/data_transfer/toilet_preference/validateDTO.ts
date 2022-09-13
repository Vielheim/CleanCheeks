import { PreferenceType } from '../../../enums';
import { validate } from '../validate/Util';
import { UpsertPreferenceDTO } from './preference.dto';

export const validateUpsertPreferenceDTO = (payload: UpsertPreferenceDTO) => {
  validatePreferenceType(payload.type);
};

const validatePreferenceType = (type: string) => {
  const isValidated = (<any>PreferenceType)[type.toUpperCase()] !== undefined;
  validate(
    isValidated,
    `type ${type} must be one of ${Object.keys(PreferenceType)}`
  );
};
