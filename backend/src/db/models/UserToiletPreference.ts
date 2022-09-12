import { DataTypes, Model, Optional } from 'sequelize';
import { PreferenceType } from '../../enums/UserToiletPreferenceEnums';
import sequelizeConnection from '../config';
import Toilet, { IToiletInput } from './Toilet';
import User from './User';

interface IUserToiletPreferenceAttributes {
  user_id: string;
  toilet_id: string;
  type: PreferenceType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserToiletPreferenceInput
  extends Optional<
    IUserToiletPreferenceAttributes,
    'createdAt' | 'updatedAt'
  > {}

export interface IUserToiletPreferenceOutput
  extends Required<IUserToiletPreferenceAttributes> {}

class UserToiletPreference
  extends Model<IUserToiletPreferenceAttributes, IUserToiletPreferenceInput>
  implements IUserToiletPreferenceAttributes
{
  public type!: PreferenceType;
  public user_id!: string;
  public toilet_id!: string;

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

UserToiletPreference.init(
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
    sequelize: sequelizeConnection,
    timestamps: true, // auto-update timestamps
  }
);

Toilet.hasMany(UserToiletPreference);
User.hasMany(UserToiletPreference);

UserToiletPreference.belongsTo(User, {
  foreignKey: 'user_id',
});
UserToiletPreference.belongsTo(Toilet, {
  foreignKey: 'toilet_id',
});

export default UserToiletPreference;
