import UserToiletPreference, {
  IUserToiletPreferenceInput,
  IUserToiletPreferenceOutput,
} from '../../models/UserToiletPreference';

export const upsert = async (
  payload: IUserToiletPreferenceInput
): Promise<[IUserToiletPreferenceOutput, boolean]> => {
  // Upsert does not distinguish between creation and update for postgres https://sequelize.org/docs/v6/other-topics/upgrade/#:~:text=created%20value%20will%20always%20be%20null.
  const toiletPref = await UserToiletPreference.findOne({
    where: {
      user_id: payload.user_id,
      toilet_id: payload.toilet_id,
    },
  });

  if (toiletPref == null) {
    const newToiletPref = await UserToiletPreference.create(payload);
    return [newToiletPref, true];
  }

  const updatedToiletPref = await toiletPref.update(payload);
  return [updatedToiletPref, false];
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
