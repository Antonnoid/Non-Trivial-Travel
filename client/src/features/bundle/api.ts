import {City} from '../city/types/types';
import { Rating } from '../place/type';
import {Bundle} from './type';

/* eslint-disable import/prefer-default-export */
export const bundleInitFetch = async (): Promise<Bundle[]> => {
  const res = await fetch('/api/bundles');
  const data = res.json();
  return data;
};

export const bundlesInitFromCity = async (
  id: City['id']
): Promise<Bundle[]> => {
  const res = await fetch(`api/cities/search/id/${id}`);
  const data = await res.json();
  return data.Bundle;
};

export const bundleRatingAddFetch = async (
  rating: Rating,
  bundle: Bundle
): Promise<Rating> => {
  const res = await fetch(`/api/bundles/${bundle.id}/rating`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      rate: rating.rate,
      type: 'place',
    }),
  });
  const data = res.json();
  return data
};