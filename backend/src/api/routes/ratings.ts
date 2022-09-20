import { Request, Response, Router } from 'express';
import * as ratingController from '../controllers/toilet_rating';
import { CreateRatingDTO } from '../data_transfer/toilet_rating/rating.dto';
import Util from '../util/Util';
import authMiddleware from '../middlewares/auth';

const ratingsRouter = Router();
ratingsRouter.use(authMiddleware);

ratingsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const payload: CreateRatingDTO = req.body;
    const result = await ratingController.create(payload);
    return Util.sendSuccess(res, 201, 'Added rating', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

ratingsRouter.get('/', async (_, res: Response) => {
  try {
    const results = await ratingController.getAll();
    return Util.sendSuccess(res, 200, 'Retrieve all ratings', results);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default ratingsRouter;
