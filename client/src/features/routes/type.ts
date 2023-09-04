export type Route = {
  id: number;
  title: string;
  description: string;
  time: string;
  rating: number;
  isPublic: boolean;
  userId: number;
  cityId: number;
};

export type RoutesState = {
  routes: Route[];
  error: string | undefined;
};
