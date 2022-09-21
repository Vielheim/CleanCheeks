import { Request, Response, Router } from 'express';
import * as preferenceController from '../controllers/toilet_preference';
import { UpsertPreferenceDTO } from '../data_transfer/toilet_preference/preference.dto';
import Util from '../util/Util';
import authMiddleware from '../middlewares/auth';

const preferencesRouter = Router();
preferencesRouter.use(authMiddleware);

preferencesRouter.put('/', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.cookies;
    const payload: UpsertPreferenceDTO = { ...req.body, user_id };
    const [result, isCreated] = await preferenceController.upsert(payload);

    if (isCreated) {
      return Util.sendSuccess(res, 201, 'Added new toilet preference', result);
    }

    return Util.sendSuccess(
      res,
      200,
      'Update existing toilet preference',
      result
    );
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

preferencesRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.cookies;
    const toiletId: string = req.query.toiletId as string;
    const result = await preferenceController.deleteByUserIdAndToiletId(
      user_id,
      toiletId
    );

    return Util.sendSuccess(res, 200, 'Deleted toilet preference', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default preferencesRouter;
