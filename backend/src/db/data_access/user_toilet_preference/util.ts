import { DataNotFoundError } from '../../../errors/Errors';
import { UserToiletPreference } from '../../models';
import { IUserToiletPreferenceInput } from '../../models/UserToiletPreference';

export const queryUserToiletPreferenceBy = async (
  payload: Partial<IUserToiletPreferenceInput>
): Promise<UserToiletPreference> => {
  const toiletPreference = await UserToiletPreference.findOne({
    where: payload,
  });

  if (toiletPreference == null) {
    throw new DataNotFoundError(`UserToiletPreference ${payload} not found!`);
  }

  return toiletPreference;
};
