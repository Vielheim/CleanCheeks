import { Router } from "express";
import toiletsRouter from "./toilets";
import usersRouter from './users';

const router = Router();

router.use("/toilets", toiletsRouter);
router.use('/users', usersRouter);

export default router;
