import { Request, Response, Router } from 'express';
import * as authController from '../controllers/auth';
import Util from '../util/Util';

const authRouter = Router();

authRouter.post('/google', async (req: Request, res: Response) => {
  try {
    const { credential } = req.body.response;
    const result = await authController.googleLogin(credential);
    const { userId, accessToken } = result;
    res.cookie('user_id', userId, { httpOnly: true });
    res.cookie('access_token', accessToken, { httpOnly: true });
    Util.sendSuccess(res, 201, 'Successfully logged in', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default authRouter;
