/* eslint-disable import/prefer-default-export */
import {Rating} from './type';

export const ratingInitFetch = async (): Promise<Rating[]> => {
  const res = await fetch('/api/ratings');
  const data = res.json();
  return data;
};
