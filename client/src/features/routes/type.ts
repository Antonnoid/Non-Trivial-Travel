import {Place} from '../place/type';

export type Route = {
  id: number;
  title: string;
  description: string;
  time: string;
  isPublic: boolean;
  userId: number;
  cityId: number;
  Route_places: RoutePlace[];
};

export type RoutesState = {
  routes: Route[];
  allRoutes: Route[];
  error: string | undefined;
};

export type RoutePlace = {
  id: number;
  routeId: number;
  order: number;
  placeId: number;
  Place: Place[];
};
