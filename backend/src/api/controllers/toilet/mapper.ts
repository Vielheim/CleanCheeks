import { IToiletOutput } from "../../../db/models/Toilet";
import { IToilet } from "../../interfaces";

// maps data from db layer to api layer
export const toToilet = (toilet: IToiletOutput): IToilet => {
    return {
        toilet_code: toilet.toilet_code,
        name: toilet.name,
        floor: toilet.floor,
        longitude: toilet.longitude,
        latitude: toilet.latitude,
        createdAt: toilet.createdAt,
        updatedAt: toilet.updatedAt,
        deletedAt: toilet.deletedAt,
    };
};
