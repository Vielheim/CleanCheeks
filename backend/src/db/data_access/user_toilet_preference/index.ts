import toiletsRouter from '../../../api/routes/toilets';
import UserToiletPreference, {
  IUserToiletPreferenceInput,
  IUserToiletPreferenceOutput,
} from '../../models/UserToiletPreference';

export const upsert = async (
  payload: IUserToiletPreferenceInput
): Promise<IUserToiletPreferenceOutput> => {
  console.log(payload);
  const toiletPreference = await UserToiletPreference.findOne({
    where: {
      user_id: payload.user_id,
      toilet_id: payload.toilet_id,
    },
  });

  if (toiletPreference == null) {
    return await UserToiletPreference.create(payload);
  }

  return await toiletPreference.update(payload);
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
