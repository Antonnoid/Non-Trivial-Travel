import {City} from '../navbar/types/types';
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
