export interface IUser {
  id: string;
  blacklisted_toilets: string[];
  favourited_toilets: string[];
  createdAt: Date;
  updatedAt: Date;
}
