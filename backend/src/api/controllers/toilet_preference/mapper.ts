import { IToiletPreferenceOutput } from '../../../db/models/ToiletPreference';
import { PreferenceType } from '../../../enums';
import { UpsertPreferenceDTO } from '../../data_transfer/toilet_preference/preference.dto';
import { IPreference } from '../../interfaces/preferences.interface';

export const toIToiletPreferenceInput = (
  preferenceDTO: UpsertPreferenceDTO
) => {
  return {
    ...preferenceDTO,
    type: (<any>PreferenceType)[preferenceDTO.type.toUpperCase()],
  };
};

export const toIPreference = ({
  toilet_id,
  user_id,
  type,
  createdAt,
  updatedAt,
}: IToiletPreferenceOutput): IPreference => {
  return {
    toilet_id,
    user_id,
    type,
    createdAt,
    updatedAt,
  };
};
