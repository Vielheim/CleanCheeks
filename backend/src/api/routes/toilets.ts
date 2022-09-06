import { Router, Request, Response } from "express";
import * as toiletController from "../controllers/toilet";
import {
    CreateToiletDTO,
    FilterToiletsDTO,
    UpdateToiletDTO,
} from "../data_tranfer/toilet.dto";

const toiletsRouter = Router();

toiletsRouter.post("/", async (req: Request, res: Response) => {
    const payload: CreateToiletDTO = req.body;
    const result = await toiletController.create(payload);
    return res.status(200).json(result);
});

toiletsRouter.put("/:toilet_code", async (req: Request, res: Response) => {
    const toilet_code = req.params.toilet_code;
    const payload: UpdateToiletDTO = req.body;
    const result = await toiletController.update(toilet_code, payload);
    return res.status(201).json(result);
});

toiletsRouter.delete("/:toilet_code", async (req: Request, res: Response) => {
    const toilet_code = req.params.toilet_code;
    const result = await toiletController.deleteById(toilet_code);
    console.log(`result ${result}`);
    return res.status(200).json({
        success: result,
    });
});

toiletsRouter.get("/:toilet_code", async (req: Request, res: Response) => {
    const toilet_code = req.params.toilet_code;
    const result = await toiletController.getById(toilet_code);
    return res.status(200).json(result);
});

toiletsRouter.get("/", async (req: Request, res: Response) => {
    const filters: FilterToiletsDTO = req.query;
    const results = await toiletController.getAll(filters);
    return res.status(200).json(results);
});

export default toiletsRouter;
