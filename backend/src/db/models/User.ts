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
      validate: {
        allUnique(value: any) {
          const arr = Array.isArray(value) ? value : [value];
          if (!isUnique(arr)) {
            throw new Error(
              'No duplicate values allowed in blacklisted_toilets!'
            );
          }
        },
      },
    },
    favourited_toilets: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
      validate: {
        allUnique(value: any) {
          console.log(value);
          const arr = Array.isArray(value) ? value : [value];
          if (!isUnique(arr)) {
            throw new Error(
              'No duplicate values allowed in favourited_toilets!'
            );
          }
        },
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true, // auto-update timestamps
  }
);

const isUnique = (array: Array<any>): boolean => {
  const set = new Set(array);
  return set.size == array.length;
};

export default User;
