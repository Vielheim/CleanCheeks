import * as service from "../../../db/services/ToiletService";
import {
    CreateToiletDTO,
    FilterToiletsDTO,
    UpdateToiletDTO,
} from "../../data_tranfer/toilet.dto";
import { IToilet } from "../../interfaces";
import * as mapper from "./mapper";

export const create = async (payload: CreateToiletDTO): Promise<IToilet> => {
    const toiletOutput = await service.create({ ...payload });
    return mapper.toToilet(toiletOutput);
};

export const update = async (
    toilet_code: string,
    payload: UpdateToiletDTO
): Promise<IToilet> => {
    const toiletOutput = await service.update(toilet_code, { ...payload });
    return mapper.toToilet(toiletOutput);
};

export const deleteById = async (toilet_code: string): Promise<boolean> => {
    return await service.deleteById(toilet_code);
};

export const getById = async (toilet_code: string): Promise<IToilet> => {
    const toiletOutput = await service.getById(toilet_code);
    return mapper.toToilet(toiletOutput);
};

export const getAll = async (filters: FilterToiletsDTO): Promise<IToilet[]> => {
    return (await service.getAll(filters)).map(mapper.toToilet);
};
