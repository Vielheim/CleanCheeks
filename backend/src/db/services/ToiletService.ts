import * as toiletDataAccess from "../data_access/toilet";
import { GetAllToiletsFilters } from "../data_access/types";
import { IToiletInput, IToiletOutput } from "../models/Toilet";

export const create = (payload: IToiletInput): Promise<IToiletOutput> => {
    return toiletDataAccess.create(payload);
};

export const update = (
    toilet_code: string,
    payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
    return toiletDataAccess.update(toilet_code, payload);
};

export const deleteById = (toilet_code: string): Promise<boolean> => {
    return toiletDataAccess.deleteById(toilet_code);
};

export const getById = (toilet_code: string): Promise<IToiletOutput> => {
    return toiletDataAccess.getById(toilet_code);
};

export const getAll = (
    filters?: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
    return toiletDataAccess.getAll(filters);
};
