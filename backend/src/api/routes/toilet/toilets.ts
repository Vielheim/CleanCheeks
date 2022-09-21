import { Request, Response, Router } from 'express';
import * as toiletController from '../../controllers/toilet';
import Util from '../../util/Util';
import {
  getCoordinatesFromReq,
  getFilterToiletsDTOFromReq,
} from './toilets.util';

const toiletsRouter = Router();

toiletsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await toiletController.deleteById(id);
    return Util.sendSuccess(res, 200, 'Deleted toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

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

toiletsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await toiletController.getById(id);
    return Util.sendSuccess(res, 200, 'Retrieved toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

toiletsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const filters = getFilterToiletsDTOFromReq(req);
    const results = await toiletController.getAll(filters);
    return Util.sendSuccess(res, 200, 'Retrieved all toilets', results);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default toiletsRouter;
