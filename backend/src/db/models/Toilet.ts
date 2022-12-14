import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { ToiletType, Utilities } from '../../enums';
import sequelize from '../index';
import ToiletPreference from './ToiletPreference';
interface IToiletAttributes {
  id: string;
  building: string;
  description: string;
  floor: number;
  longitude: number;
  latitude: number;
  num_seats: number;
  num_squats: number;
  cleanliness: number;
  num_ratings: number;
  type: ToiletType;
  utilities: Utilities[];
  createdAt?: Date;
  updatedAt?: Date;
}

// IToiletInput defines the type of object passed to model.create()
export interface IToiletInput
  extends Optional<
    IToiletAttributes,
    'id' | 'createdAt' | 'updatedAt' | 'num_ratings'
  > {}

// IToiletOutput defines the return object from model.create(), model.update(), model.findOne() etc.
export interface IToiletOutput extends Required<IToiletAttributes> {
  toiletPreferences?: ToiletPreference[]; // from join with ToiletPreferences
}

class Toilet
  extends Model<IToiletAttributes, IToiletInput>
  implements IToiletAttributes
{
  public id!: string;
  public building!: string;
  public description!: string;
  public floor!: number;
  public longitude!: number;
  public latitude!: number;
  public num_seats!: number;
  public num_squats!: number;
  public cleanliness!: number;
  public num_ratings!: number;
  public type!: ToiletType;
  public utilities!: Utilities[];

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

Toilet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4, // use the UUID fn to generate a new id
      validate: {
        isUUID: 4,
      },
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
    num_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    num_squats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    cleanliness: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
      validate: {
        max: 1,
        min: -1,
      },
    },
    num_ratings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    type: {
      type: DataTypes.ENUM(...Object.keys(ToiletType)),
      allowNull: false,
    },
    utilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      values: [...Object.keys(Utilities)],
    },
  },
  {
    sequelize: sequelize,
    timestamps: true, // auto-update timestamps
  }
);

export default Toilet;
