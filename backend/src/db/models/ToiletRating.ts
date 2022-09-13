import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { RatingType } from '../../enums/ToiletRatingEnums';
import sequelizeConnection from '../config';
import Toilet from './Toilet';
import User from './User';

interface IToiletRatingAttributes {
  id: string;
  user_id: string;
  toilet_id: string;
  type: RatingType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IToiletRatingInput
  extends Optional<IToiletRatingAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IToiletRatingOutput
  extends Required<IToiletRatingAttributes> {}

class ToiletRating
  extends Model<IToiletRatingAttributes, IToiletRatingInput>
  implements IToiletRatingAttributes
{
  public id!: string;
  public user_id!: string;
  public toilet_id!: string;
  public type!: RatingType;

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

ToiletRating.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4, // use the UUID fn to generate a new id
      validate: {
        isUUID: 4,
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toilet_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.keys(RatingType)),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true, // auto-update timestamps
  }
);

Toilet.hasMany(ToiletRating, { foreignKey: 'toilet_id' });
User.hasMany(ToiletRating, { foreignKey: 'user_id' });

ToiletRating.belongsTo(User, {
  foreignKey: 'user_id',
});
ToiletRating.belongsTo(Toilet, {
  foreignKey: 'toilet_id',
});

export default ToiletRating;
