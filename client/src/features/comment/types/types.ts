export type CommentOfPlace = {
  id?: number;
  text: string;
  userId?: number;
  placeId?: number;
};
export type CommentOfRoute = {
  id?: number;
  text: string;
  userId?: number;
  routeId?: number;
};
export type CommentOfBundle = {
  id?: number;
  text: string;
  userId?: number;
  bundleId?: number;
};
