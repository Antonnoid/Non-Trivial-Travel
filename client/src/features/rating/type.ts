export type Rating = {
  id: number;
  rate: number;
  type: string;
  userId: number;
  itemId: number;
};

export type RatingsState = {
  ratings: Rating[];
  error: string | undefined;
};
