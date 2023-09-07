import {City} from '../city/types/types';
import { Rating } from '../rating/type'; 
import {Route} from './type';

export const routeInitFetch = async (): Promise<Route[]> => {
  const res = await fetch('/api/routes');
  const data = res.json();
  return data;
};

export const routesInitFromCity = async (id: City['id']): Promise<Route[]> => {
  const res = await fetch(`/api/cities/search/id/${id}`);
  const data = await res.json();
  return data.Route;
};

export const routeRatingAddFetch = async (
  rating: Rating,
  route: Route
): Promise<Rating> => {
  const res = await fetch(`/api/places/${route.id}/rating`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      rate: rating.rate,
      type: 'route',
    }),
  });
  const data = res.json();
  return data
};