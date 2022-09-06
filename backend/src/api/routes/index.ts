import { Router } from "express";
import toiletsRouter from "./toilets";

const router = Router();

router.use("/toilets", toiletsRouter);

export default router;
