import { Optional } from "sequelize";

export type CreateToiletDTO = {
    toilet_code: string;
    name: string;
    floor: number;
    longitude: number;
    latitude: number;
};

export type UpdateToiletDTO = Optional<
    CreateToiletDTO,
    "name" | "floor" | "longitude" | "latitude"
>;

// TODO update filtersDTO
export type FilterToiletsDTO = {};
