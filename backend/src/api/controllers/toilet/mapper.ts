import { IToiletOutput } from "../../../db/models/Toilet";
import { IToilet } from "../../interfaces";

// maps data from db layer to api layer
export const toToilet = ({
    toilet_code,
    name,
    floor,
    longitude,
    latitude,
    createdAt,
    updatedAt,
    deletedAt,
}: IToiletOutput): IToilet => {
    return {
        toilet_code,
        name,
        floor,
        longitude,
        latitude,
        createdAt,
        updatedAt,
        deletedAt,
    };
};
