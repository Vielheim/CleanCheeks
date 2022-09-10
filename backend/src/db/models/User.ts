import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface IUserAttributes {
  id: string;
  blacklisted_toilets: number[];
  favourited_toilets: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput
  extends Optional<
    IUserAttributes,
    'createdAt' | 'updatedAt' | 'blacklisted_toilets' | 'favourited_toilets'
  > {}

export interface IUserOutput extends Required<IUserAttributes> {}

class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  public id!: string;
  public blacklisted_toilets!: number[];
  public favourited_toilets!: number[];

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
    blacklisted_toilets: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },
    favourited_toilets: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true, // auto-update timestamps
  }
);

export default User;
