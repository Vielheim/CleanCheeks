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
