import { Request, Response, Router } from 'express';
import * as toiletController from '../../controllers/toilet';
import Util from '../../util/Util';
import { getCoordinatesFromReq } from './toilets.util';

const toiletsRouter = Router();

toiletsRouter.get('/neighbours', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.cookies;
    const coordinates = getCoordinatesFromReq(req);
    const results = await toiletController.getAllNeighbouringToilets(
      coordinates,
      user_id
    );
    return Util.sendSuccess(
      res,
      200,
      'Retrieved all neighbouring toilets',
      results
    );
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

toiletsRouter.get(
  '/with_user_preferences',
  async (req: Request, res: Response) => {
    try {
      const { user_id } = req.cookies;
      const results = await toiletController.getToiletsWithUserPreferences(
        user_id
      );
      return Util.sendSuccess(
        res,
        200,
        'Retrieved toilets set with user preferences',
        results
      );
    } catch (error: unknown) {
      return Util.sendFailure(res, error);
    }
  }
);

toiletsRouter.get('/ranking', async (req: Request, res: Response) => {
  try {
    const toiletId: string = req.query.id as string;
    const result = await toiletController.getRank(toiletId);
    return Util.sendSuccess(res, 200, 'Get toilet ranking', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default toiletsRouter;
