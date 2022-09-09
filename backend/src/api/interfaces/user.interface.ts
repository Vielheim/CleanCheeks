export interface IUser {
  id: string;
  blacklisted_toilets: number[];
  favourited_toilets: number[];
  createdAt: Date;
  updatedAt: Date;
}
