export interface IToilet {
    toilet_code: string;
    name: string;
    floor: number;
    longitude: number;
    latitude: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
