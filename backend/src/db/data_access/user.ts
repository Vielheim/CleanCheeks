import sequelize from 'sequelize';
import { User } from '../models';
import { IUserInput, IUserOutput } from '../models/User';

export const create = async (payload: IUserInput): Promise<IUserOutput> => {
  return await User.create(payload);
};

export const update = async (
  id: string,
  payload: Partial<IUserInput>
): Promise<IUserOutput> => {
  const user = await User.findByPk(id);

  if (user == null) {
    throw new Error(`User with id ${id} not found`);
  }

  return await user.update(payload);
};

export const deleteById = async (id: string): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id: id },
  });

  return !!deletedUserCount;
};

export const getById = async (id: string): Promise<IUserOutput> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error(`User with id ${id} not found!`);
  }

  return user;
};

export const getAll = async (): Promise<IUserOutput[]> => {
  return User.findAll();
};

export const favouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  const updatedUserCount = await User.update(
    {
      favourited_toilets: sequelize.fn(
        'array_append',
        sequelize.col('favourited_toilets'),
        toilet_id
      ),
    },
    { where: { id: user_id } }
  );

  return !!updatedUserCount;
};

export const unfavouriteToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  const updatedUserCount = await User.update(
    {
      favourited_toilets: sequelize.fn(
        'array_remove',
        sequelize.col('favourited_toilets'),
        toilet_id
      ),
    },
    { where: { id: user_id } }
  );

  return !!updatedUserCount;
};

export const blacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  const updatedUserCount = await User.update(
    {
      blacklisted_toilets: sequelize.fn(
        'array_append',
        sequelize.col('blacklisted_toilets'),
        toilet_id
      ),
    },
    { where: { id: user_id } }
  );

  return !!updatedUserCount;
};

export const unblacklistToilet = async (
  user_id: string,
  toilet_id: string
): Promise<boolean> => {
  const updatedUserCount = await User.update(
    {
      blacklisted_toilets: sequelize.fn(
        'array_remove',
        sequelize.col('blacklisted_toilets'),
        toilet_id
      ),
    },
    { where: { id: user_id } }
  );

  return !!updatedUserCount;
};
