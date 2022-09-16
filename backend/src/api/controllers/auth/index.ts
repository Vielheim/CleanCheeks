import * as userController from '../user';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client({
  clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
});

export const googleLogin = async (token: string) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  const payload = ticket.getPayload()!;

  const userId = payload['sub'];
  let user;
  try {
    user = await userController.getById(userId);
  } catch (e: any) {
    user = await userController.create({ id: userId });
  }

  const result = {
    user: user,
    token: token,
  };
  return result;
};
