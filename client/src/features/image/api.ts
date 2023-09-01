/* eslint-disable import/prefer-default-export */
import {Image} from './type';

export const imagesInitFetch = async (): Promise<Image[]> => {
  const res = await fetch('/api/images');
  const data = await res.json();
  return data;
};
