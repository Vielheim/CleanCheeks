export type CreateRatingDTO = {
  toilet_id: string;
  user_id: string;
  type: string;
};

export type QueryRatingDTO = {
  toilet_id: string;
  user_id: string;
};
