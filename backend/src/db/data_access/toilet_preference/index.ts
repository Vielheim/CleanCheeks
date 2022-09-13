import ToiletPreference, {
  IToiletPreferenceInput,
  IToiletPreferenceOutput,
} from '../../models/ToiletPreference';

export const upsert = async (
  payload: IToiletPreferenceInput
): Promise<[IToiletPreferenceOutput, boolean]> => {
  // Upsert does not distinguish between creation and update for postgres https://sequelize.org/docs/v6/other-topics/upgrade/#:~:text=created%20value%20will%20always%20be%20null.
  const toiletPref = await ToiletPreference.findOne({
    where: {
      user_id: payload.user_id,
      toilet_id: payload.toilet_id,
    },
  });

  if (toiletPref == null) {
    const newToiletPref = await ToiletPreference.create(payload);
    return [newToiletPref, true];
  }

  const updatedToiletPref = await toiletPref.update(payload);
  return [updatedToiletPref, false];
};

export const deleteByToiletIdAndUserId = async (
  userId: string,
  toiletId: string
): Promise<boolean> => {
  const deletedToiletCount = await ToiletPreference.destroy({
    where: {
      user_id: userId,
      toilet_id: toiletId,
    },
  });

  return !!deletedToiletCount;
};

export const queryByUserId = async (
  userId: string
): Promise<Array<IToiletPreferenceOutput>> => {
  return await ToiletPreference.findAll({
    where: {
      user_id: userId,
    },
  });
};

export const queryAll = async (): Promise<Array<IToiletPreferenceOutput>> => {
  return await ToiletPreference.findAll();
};
