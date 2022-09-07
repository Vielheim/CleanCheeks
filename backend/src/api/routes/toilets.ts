import { Request, Response, Router } from 'express';
import * as toiletController from '../controllers/toilet';
import {
  CreateToiletDTO,
  FilterToiletsDTO,
  UpdateToiletDTO,
} from '../data_tranfer/toilet.dto';
import Util from '../util/Util';

const toiletsRouter = Router();

toiletsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const payload: CreateToiletDTO = req.body;
    const result = await toiletController.create(payload);
    return Util.sendSuccess(res, 201, 'Added toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

toiletsRouter.put('/:toilet_code', async (req: Request, res: Response) => {
  try {
    const toilet_code = req.params.toilet_code;
    const payload: UpdateToiletDTO = req.body;
    const result = await toiletController.update(toilet_code, payload);
    return Util.sendSuccess(res, 200, 'Updated toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

toiletsRouter.delete('/:toilet_code', async (req: Request, res: Response) => {
  try {
    const toilet_code = req.params.toilet_code;
    const result = await toiletController.deleteById(toilet_code);
    return Util.sendSuccess(res, 200, 'Deleted toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

toiletsRouter.get('/:toilet_code', async (req: Request, res: Response) => {
  try {
    const toilet_code = req.params.toilet_code;
    const result = await toiletController.getById(toilet_code);
    return Util.sendSuccess(res, 200, 'Retrieved toilet', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

toiletsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const filters: FilterToiletsDTO = req.query;
    const results = await toiletController.getAll(filters);
    return Util.sendSuccess(res, 200, 'Retrieved all toilets', results);
  } catch (error: unknown) {
    return Util.sendFailure(res, 400, error);
  }
});

export default toiletsRouter;
