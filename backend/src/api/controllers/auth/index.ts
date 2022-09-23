import * as UserController from '../user';
import { OAuth2Client } from 'google-auth-library';
import JwtUtils from '../../util/JwtUtils';
import { ILoginResponse } from '../../interfaces/auth.interface';

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
});

export const googleLogin = async (idToken: string): Promise<ILoginResponse> => {
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
    expiresIn: '7d',
  });

  return {
    userId: user.id,
    accessToken,
  };
};
