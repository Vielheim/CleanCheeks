import { Request, Response, Router } from 'express';
import * as userController from '../controllers/user';
import { CreateUserDTO, UpdateUserDTO } from '../data_tranfer/user.dto';
import Util from '../util/Util';

const usersRouter = Router();

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const payload: CreateUserDTO = req.body;
    const result = await userController.create(payload);
    return Util.sendSuccess(res, 201, 'Added user', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

usersRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload: UpdateUserDTO = req.body;
    const result = await userController.update(id, payload);
    return Util.sendSuccess(res, 200, 'Updated user', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userController.getById(id);
    return Util.sendSuccess(res, 200, 'Retrieved user', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

export default usersRouter;
