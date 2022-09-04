import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface IToiletAttributes {
    toilet_code: string;
    name: string;
    floor: number;
    longitude: number;
    latitude: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// IToiletInput defines the type of object passed to model.create()
export interface IToiletInput
    extends Optional<IToiletAttributes, "createdAt" | "updatedAt"> {}

// IToiletOutput defines the return object from model.create(), model.update(), model.findOne() etc.
export interface IToiletOutput extends Required<IToiletAttributes> {}

class Toilet
    extends Model<IToiletAttributes, IToiletInput>
    implements IToiletAttributes
{
    public toilet_code!: string;
    public name!: string;
    public floor!: number;
    public longitude!: number;
    public latitude!: number;

    // timestamps! (Will be updated by sequelize)
    public createdAt!: Date;
    public updatedAt!: Date;
}

Toilet.init(
    {
        toilet_code: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
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
    },
    {
        sequelize: sequelizeConnection,
        timestamps: true, // auto-update timestamps
    }
);

export default Toilet;
