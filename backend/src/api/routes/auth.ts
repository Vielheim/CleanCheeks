import { Request, Response, Router } from 'express';
import * as authController from '../controllers/auth';
import Util from '../util/Util';
import usersRouter from './users';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const token = await authController.login(id);
    return Util.sendSuccess(res, 201, 'Successfully logged in', token);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default authRouter;
