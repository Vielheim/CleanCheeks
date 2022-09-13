import { Router } from "express";
import toiletsRouter from "./toilets";
import usersRouter from './users';
import ratingsRouter from './ratings';

const router = Router();

router.use('/toilets', toiletsRouter);
router.use('/users', usersRouter);
router.use('/toilet_ratings', ratingsRouter);

export default router;
