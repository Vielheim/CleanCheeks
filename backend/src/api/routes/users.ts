import { Request, Response, Router } from 'express';
import * as userController from '../controllers/user';
import * as userToiletPreferenceController from '../controllers/user_toilet_preference';
import { CreateUserDTO } from '../data_transfer/user/user.dto';
import Util from '../util/Util';

const usersRouter = Router();

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const payload: CreateUserDTO = req.body;
    const result = await userController.create(payload);
    return Util.sendSuccess(res, 201, 'Added user', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

usersRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userController.getById(id);
    return Util.sendSuccess(res, 200, 'Retrieved user', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

usersRouter.get('/', async (_, res: Response) => {
  try {
    const result = await userController.getAll();
    return Util.sendSuccess(res, 200, 'Retrieved all users', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

// TODO: Check that acting user is the same as user_id field
usersRouter.post(
  '/:user_id/favouriteToilet/:toilet_id',
  async (req: Request, res: Response) => {
    try {
      const toiletId = req.params.toilet_id;
      const userId = req.params.user_id;
      const result = await userToiletPreferenceController.favouriteToilet(
        userId,
        toiletId
      );
      return Util.sendSuccess(res, 201, 'Favourited toilet', result);
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

// TODO: Check that acting user is the same as user_id field
usersRouter.delete(
  '/:user_id/unfavouriteToilet/:toilet_id',
  async (req: Request, res: Response) => {
    try {
      const toiletId = req.params.toilet_id;
      const userId = req.params.user_id;
      const result = await userToiletPreferenceController.unfavouriteToilet(
        userId,
        toiletId
      );
      return Util.sendSuccess(res, 200, 'Unfavourited toilet', result);
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

// TODO: Check that acting user is the same as user_id field
usersRouter.post(
  '/:user_id/blacklistToilet/:toilet_id',
  async (req: Request, res: Response) => {
    try {
      const toiletId = req.params.toilet_id;
      const userId = req.params.user_id;
      console.log(toiletId);
      console.log(userId);
      const result = await userToiletPreferenceController.blacklistToilet(
        userId,
        toiletId
      );
      return Util.sendSuccess(res, 201, 'Blacklisted toilet', result);
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

// TODO: Check that acting user is the same as user_id field
usersRouter.delete(
  '/:user_id/unblacklistToilet/:toilet_id',
  async (req: Request, res: Response) => {
    try {
      const toiletId = req.params.toilet_id;
      const userId = req.params.user_id;
      const result = await userToiletPreferenceController.unblacklistToilet(
        userId,
        toiletId
      );
      return Util.sendSuccess(res, 200, 'Unblacklisted toilet', result);
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

usersRouter.get(
  '/:user_id/toiletpreferences',
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.user_id;
      const result = await userToiletPreferenceController.getByUserId(userId);
      return Util.sendSuccess(res, 200, 'Toilet preferences', result);
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

export default usersRouter;
