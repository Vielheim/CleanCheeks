export type CreateUserDTO = {
  id: string; // Google / FB Token
};

export type UpdateUserDTO = {
  blacklisted_toilets: number[];
  favourited_toilets: number[];
};
