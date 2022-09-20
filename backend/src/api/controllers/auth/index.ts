import * as UserController from '../user';
import { OAuth2Client } from 'google-auth-library';
import JwtUtils from '../../util/JwtUtils';

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
});

export const googleLogin = async (idToken: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  const payload = ticket.getPayload()!;
  const userId = payload['sub'];

  let user;
  try {
    user = await UserController.getById(userId);
  } catch (e: any) {
    user = await UserController.create({ id: userId });
  }

  const accessToken = JwtUtils.generateAccessToken(user, {
    expiresIn: '1d',
  });
  const result = {
    userId: user.id,
    accessToken,
  };

  return result;
};
