import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface IUserAttributes {
  id: string;
  blacklisted_toilets: String[];
  favourited_toilets: String[];
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
  public blacklisted_toilets!: String[];
  public favourited_toilets!: String[];

  // timestamps! (Will be updated by sequelize)
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blacklisted_toilets: {
      type: DataTypes.ARRAY(DataTypes.UUIDV4),
      defaultValue: [],
      allowNull: false,
    },
    favourited_toilets: {
      type: DataTypes.ARRAY(DataTypes.UUIDV4),
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
