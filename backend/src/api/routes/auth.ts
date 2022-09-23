import { Request, Response, Router } from 'express';
import * as authController from '../controllers/auth';
import Util from '../util/Util';
import JwtUtils from '../util/JwtUtils';

const authRouter = Router();

authRouter.post('/google', async (req: Request, res: Response) => {
  try {
    const { credential } = req.body.response;
    const result = await authController.googleLogin(credential);
    Util.sendSuccess(res, 201, 'Successfully logged in', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

authRouter.get('/check-login', (req: Request, res: Response) => {
  try {
    const accessToken = (req.headers['x-auth-token'] as string) ?? '';
    JwtUtils.verifyAccessToken(accessToken);
    Util.sendSuccess(res, 200, 'Successfully authenticated', true);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default authRouter;
