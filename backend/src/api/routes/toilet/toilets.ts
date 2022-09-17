import { Request, Response, Router } from 'express';
import * as toiletController from '../../controllers/toilet';
import {
  CreateToiletDTO,
  UpdateToiletDTO,
} from '../../data_transfer/toilet/toilet.dto';
import {
  getCoordinatesFromReq,
  getFilterToiletsDTOFromReq,
} from './toilets.util';
import Util from '../../util/Util';

const toiletsRouter = Router();

toiletsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const payload: CreateToiletDTO = req.body;
    const result = await toiletController.create(payload);
    return Util.sendSuccess(res, 201, 'Added toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

toiletsRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload: UpdateToiletDTO = req.body;
    const result = await toiletController.update(id, payload);
    return Util.sendSuccess(res, 200, 'Updated toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

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
