import { Request, Response, Router } from 'express';
import * as ratingController from '../controllers/toilet_rating';
import {
  CreateRatingDTO,
  QueryRatingDTO,
} from '../data_transfer/toilet_rating/rating.dto';
import Util from '../util/Util';
import authMiddleware from '../middlewares/auth';

const ratingsRouter = Router();
ratingsRouter.use(authMiddleware);

ratingsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.cookies;

    const payload: CreateRatingDTO = {
      user_id: user_id,
      toilet_id: req.body.toilet_id,
      type: req.body.type,
    };

    const result = await ratingController.create(payload);
    return Util.sendSuccess(res, 201, 'Added rating', result);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

ratingsRouter.get('/last-rated', async (req: Request, res: Response) => {
  try {
    const { user_id } = req.cookies;

    const payload: QueryRatingDTO = {
      toilet_id: req.query.toilet_id as string,
      user_id: user_id,
    };
    const results = await ratingController.getUserLastRated(payload);
    return Util.sendSuccess(res, 200, 'Retrieve last rating by user', results);
  } catch (error: unknown) {
    return Util.sendFailure(res, error);
  }
});

export default ratingsRouter;
