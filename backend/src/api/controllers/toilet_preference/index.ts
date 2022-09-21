import * as service from '../../../db/services/ToiletPreferenceService';
import { UpsertPreferenceDTO } from '../../data_transfer/toilet_preference/preference.dto';
import { validateUpsertPreferenceDTO } from '../../data_transfer/toilet_preference/validate.dto';
import { IPreference } from '../../interfaces/preferences.interface';
import * as mapper from './mapper';

export const upsert = async (
  payload: UpsertPreferenceDTO
): Promise<[IPreference, boolean]> => {
  validateUpsertPreferenceDTO(payload);

  const preferenceInput = mapper.toIToiletPreferenceInput(payload);
  const [preferenceOutput, isCreated] = await service.upsert(preferenceInput);
  return [mapper.toIPreference(preferenceOutput), isCreated];
};

export const deleteByUserIdAndToiletId = async (
  userId: string,
  toiletId: string
): Promise<boolean> => {
  return await service.deleteByUserIdAndToiletId(userId, toiletId);
};
