import {City} from './types/types';

export const fetchCity = async (): Promise<City[]> => {
  const res = await fetch('/api/cities/');
  return res.json();
};
export const fetchCityPopular = async (): Promise<City[]> => {
  const res = await fetch('/api/cities/popular');
  return res.json();
};
export const fetchCityByLetter = async (name: string): Promise<City[]> => {
  const res = await fetch('/api/cities/search/name', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({name}),
  });
  return res.json();
};
