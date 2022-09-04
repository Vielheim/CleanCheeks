import { Op } from "sequelize";
import { Toilet } from "../models";
import { IToiletInput, IToiletOutput } from "../models/Toilet";
import { GetAllToiletsFilters } from "./types";

// TODO error and corner-cases handling for each data access function

// TODO handle duplicate keys
export const create = async (payload: IToiletInput): Promise<IToiletOutput> => {
    const toilet = await Toilet.create(payload);
    return toilet;
};

export const update = async (
    toilet_code: string,
    payload: Partial<IToiletInput>
): Promise<IToiletOutput> => {
    const toilet = await Toilet.findByPk(toilet_code);

    if (!toilet) {
        // TODO handle error
        throw new Error("Toilet not found!");
    }

    const updatedToilet = await toilet.update(payload);
    return updatedToilet;
};

// TODO handle missing key or deleted
export const deleteById = async (toilet_code: string): Promise<boolean> => {
    const deletedToiletCount = await Toilet.destroy({
        where: { toilet_code },
    });

    return !!deletedToiletCount;
};

// TODO handle missing key or deleted
export const getById = async (toilet_code: string): Promise<IToiletOutput> => {
    const toilet = await Toilet.findByPk(toilet_code);

    if (!toilet) {
        throw new Error("Toilet not found!");
    }

    return toilet;
};

// TODO update to suit our use case better and make it readable
// currently idk what it does lol
export const getAll = async (
    filters?: GetAllToiletsFilters
): Promise<IToiletOutput[]> => {
    return Toilet.findAll({
        where: {
            ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
        },
        ...((filters?.isDeleted || filters?.includedDeleted) && {
            paranoid: true,
        }),
    });
};
