import { Request, Response, Router } from 'express';
import * as preferenceController from '../controllers/toilet_preference';
import { UpsertPreferenceDTO } from '../data_transfer/toilet_preference/preference.dto';
import Util from '../util/Util';

const preferencesRouter = Router();

preferencesRouter.put('/', async (req: Request, res: Response) => {
  try {
    const payload: UpsertPreferenceDTO = req.body;
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
    const userId: string = req.query.userId as string;
    const toiletId: string = req.query.toiletId as string;
    const result = await preferenceController.deleteByUserIdAndToiletId(
      userId,
      toiletId
    );

    return Util.sendSuccess(res, 200, 'Deleted toilet preference', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

preferencesRouter.get('/', async (req: Request, res: Response) => {
  try {
    let results;
    if (req.query.userId) {
      const userId: string = req.query.userId as string;
      results = await preferenceController.getByUserId(userId);
    } else {
      results = await preferenceController.getAll();
    }

    return Util.sendSuccess(res, 200, 'Retrieved toilet preferences', results);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default preferencesRouter;
