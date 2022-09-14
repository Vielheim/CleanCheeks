import { DataTypes, Model, Optional } from 'sequelize';
import { PreferenceType } from '../../enums/ToiletPreferenceEnums';
import sequelize from '../index';
import Toilet from './Toilet';
import User from './User';

interface IToiletPreferenceAttributes {
  user_id: string;
  toilet_id: string;
  type: PreferenceType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IToiletPreferenceInput
  extends Optional<IToiletPreferenceAttributes, 'createdAt' | 'updatedAt'> {}

export interface IToiletPreferenceOutput
  extends Required<IToiletPreferenceAttributes> {}

class ToiletPreference
  extends Model<IToiletPreferenceAttributes, IToiletPreferenceInput>
  implements IToiletPreferenceAttributes
{
  public user_id!: string;
  public toilet_id!: string;
  public type!: PreferenceType;

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

ToiletPreference.init(
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    toilet_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.keys(PreferenceType)),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    timestamps: true, // auto-update timestamps
  }
);

Toilet.hasMany(ToiletPreference, { foreignKey: 'toilet_id' });
User.hasMany(ToiletPreference, { foreignKey: 'user_id' });

ToiletPreference.belongsTo(User, {
  foreignKey: 'user_id',
});
ToiletPreference.belongsTo(Toilet, {
  foreignKey: 'toilet_id',
});

export default ToiletPreference;
