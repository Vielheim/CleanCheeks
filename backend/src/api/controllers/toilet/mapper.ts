import { IToiletOutput } from "../../../db/models/Toilet";
import { IToilet } from "../../interfaces";

// maps data from db layer to api layer
export const toToilet = ({
    code,
    building,
    description,
    floor,
    longitude,
    latitude,
    picture,
    num_seats,
    num_squats,
    cleanliness,
    type,
    utilities,
    createdAt,
    updatedAt,
}: IToiletOutput): IToilet => {
    return {
        code,
        building,
        description,
        floor,
        longitude,
        latitude,
        picture,
        num_seats,
        num_squats,
        cleanliness,
        type,
        utilities,
        createdAt,
        updatedAt,
    };
};
