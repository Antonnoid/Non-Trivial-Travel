import {Bundle} from '../bundle/type';
import {City} from '../city/types/types';
import {Rating} from '../rating/type';
import {Route} from './type';

export const routeInitFetch = async (): Promise<Route[]> => {
  const res = await fetch('/api/routes');
  const data = res.json();
  return data;
};

export const routesInitFromCity = async (id: City['id']): Promise<Route[]> => {
  const res = await fetch(`/api/cities/search/id/${id}`);
  const data = await res.json();
  return data.Routes;
};

export const routeAddFetch = async ({
  title,
  description,
  isPublic,
  time,
  userId,
  cityId,
  routePlaces,
}: {
  title: string;
  description: string;
  isPublic: boolean;
  time: string;
  userId: number;
  cityId: number;
  routePlaces: number[];
}): Promise<Route> => {
  const res = await fetch('/api/bundles', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      title,
      description,
      isPublic,
      time,
      userId,
      cityId,
      routePlaces,
    }),
  });
  const data = await res.json();
  return data;
};

export const routeRatingAddFetch = async (
  rate: number,
  route: Route
): Promise<Rating> => {
  const res = await fetch(`/api/places/${route.id}/rating`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      rate,
      type: 'route',
    }),
  });
  const data = res.json();
  return data;
};

// удаление
export const fetchRemoveRoute = async (
  id: Route['id']
): Promise<Route['id'] | {message: string}> => {
  const res = await fetch(`/api/routes/${id}`, {method: 'DELETE'});
  const data = await res.json();
  return data;
};
