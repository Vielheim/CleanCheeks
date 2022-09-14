import jwt from 'jsonwebtoken';
import * as userController from '../user';
import JwtUtils from '../../util/jwtUtils';

export const login = async (id: string) => {
  let user;
  try {
    user = await userController.getById(id);
  } catch (e) {
    user = await userController.create({ id: id });
  }
  const payload = { id: user.id };
  return JwtUtils.accessTokenGenerator(payload, { expiresIn: '7d' });
};
