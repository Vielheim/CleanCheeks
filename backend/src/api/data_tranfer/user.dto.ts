export type CreateUserDTO = {
  id: string;
};

export type UpdateUserDTO = {
  id: string;
  blacklisted_toilets: String[];
  favourited_toilets: String[];
};
