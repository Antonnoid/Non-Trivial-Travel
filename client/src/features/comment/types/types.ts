import {User} from '../../user/type';

export type CommentOfPlace = {
  id?: number;
  text: string;
  userId?: number;
  placeId?: number;
  User?: User;
  createdAt?: string;
};
export type CommentOfRoute = {
  id?: number;
  text: string;
  userId?: number;
  routeId?: number;
  User?: User;
  createdAt?: string;
};
export type CommentOfBundle = {
  id?: number;
  text: string;
  userId?: number;
  bundleId?: number;
  User?: User;
  createdAt?: string;
};
