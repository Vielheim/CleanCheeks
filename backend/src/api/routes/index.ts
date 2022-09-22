import { Router } from 'express';
import preferencesRouter from './preferences';
import ratingsRouter from './ratings';
import toiletsRouter from './toilet/toilets';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);
router.use('/toilets', toiletsRouter);
router.use('/toilet_ratings', ratingsRouter);
router.use('/toilet_preferences', preferencesRouter);

export default router;
