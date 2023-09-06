import {User} from '../../user/type';

export type CommentOfPlace = {
  id?: number;
  text: string;
  userId?: number;
  placeId?: number;
  User?: User;
};
export type CommentOfRoute = {
  id?: number;
  text: string;
  userId?: number;
  routeId?: number;
  User?: User;
};
export type CommentOfBundle = {
  id?: number;
  text: string;
  userId?: number;
  bundleId?: number;
  User?: User;
};
