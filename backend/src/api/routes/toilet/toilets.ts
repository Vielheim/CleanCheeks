import { Request, Response, Router } from 'express';
import * as toiletController from '../../controllers/toilet';
import Util from '../../util/Util';
import { getCoordinatesFromReq } from './toilets.util';

const toiletsRouter = Router();

toiletsRouter.get('/neighbours', async (req: Request, res: Response) => {
  try {
    const userId: string = req.query.userId as string;
    const coordinates = getCoordinatesFromReq(req);
    const results = await toiletController.getAllNeighbouringToilets(
      coordinates,
      userId
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
      const userId: string = req.query.userId as string;
      const results = await toiletController.getToiletsWithUserPreferences(
        userId
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
