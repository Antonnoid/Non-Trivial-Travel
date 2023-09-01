/* eslint-disable import/prefer-default-export */
import {Place} from './type';

export const placesInitFetch = async (): Promise<Place[]> => {
  const res = await fetch('/api/places');
  const data = await res.json();
  return data;
};
