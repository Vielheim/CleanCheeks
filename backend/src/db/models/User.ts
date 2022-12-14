import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';
import ToiletPreference from './ToiletPreference';

interface IUserAttributes {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput
  extends Optional<IUserAttributes, 'createdAt' | 'updatedAt'> {}

export interface IUserOutput extends Required<IUserAttributes> {}

class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  public id!: string;

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize: sequelize,
    timestamps: true, // auto-update timestamps
  }
);

export default User;
