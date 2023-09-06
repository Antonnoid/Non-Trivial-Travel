import {City} from '../city/types/types';
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
