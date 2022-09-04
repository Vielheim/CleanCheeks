import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { ToiletType, Utilities } from "../../enums";

interface IToiletAttributes {
    code: string;
    building: string;
    description: string;
    floor: number;
    longitude: number;
    latitude: number;
    picture?: Blob;
    num_seats: number;
    num_squats: number;
    cleanliness: number;
    type: ToiletType;
    utilities: Utilities[];
    createdAt?: Date;
    updatedAt?: Date;
}

// IToiletInput defines the type of object passed to model.create()
export interface IToiletInput
    extends Optional<
        IToiletAttributes,
        "picture" | "createdAt" | "updatedAt"
    > {}

// IToiletOutput defines the return object from model.create(), model.update(), model.findOne() etc.
export interface IToiletOutput extends Required<IToiletAttributes> {}

class Toilet
    extends Model<IToiletAttributes, IToiletInput>
    implements IToiletAttributes
{
    public code!: string;
    public building!: string;
    public description!: string;
    public floor!: number;
    public longitude!: number;
    public latitude!: number;
    public picture!: Blob;
    public num_seats!: number;
    public num_squats!: number;
    public cleanliness!: number;
    public type!: ToiletType;
    public utilities!: Utilities[];

    // timestamps! (Will be updated by sequelize)
    public createdAt!: Date;
    public updatedAt!: Date;
}

Toilet.init(
    {
        code: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        building: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        floor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        picture: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        num_seats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        num_squats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cleanliness: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        utilities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        timestamps: true, // auto-update timestamps
    }
);

export default Toilet;
