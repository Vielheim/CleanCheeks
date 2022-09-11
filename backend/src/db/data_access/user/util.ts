import { DataNotFoundError } from '../../../errors/Errors';
import { User } from '../../models';

export const queryUserBy = async (id: string): Promise<User> => {
  const user = await User.findByPk(id);

  if (user == null) {
    throw new DataNotFoundError(`User ${id} not found!`);
  }

  return user;
};
