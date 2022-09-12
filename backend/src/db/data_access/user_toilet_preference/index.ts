import UserToiletPreference, {
  IUserToiletPreferenceInput,
  IUserToiletPreferenceOutput,
} from '../../models/UserToiletPreference';

export const upsert = async (
  payload: IUserToiletPreferenceInput
): Promise<IUserToiletPreferenceOutput> => {
  const [result] = await UserToiletPreference.upsert(payload);
  return result;
};

export const remove = async (
  payload: IUserToiletPreferenceInput
): Promise<boolean> => {
  const deletedToiletCount = await UserToiletPreference.destroy({
    where: payload,
  });

  return !!deletedToiletCount;
};

export const queryByUserId = async (
  user_id: string
): Promise<Array<IUserToiletPreferenceOutput>> => {
  return UserToiletPreference.findAll({
    where: {
      user_id: user_id,
    },
  });
};
