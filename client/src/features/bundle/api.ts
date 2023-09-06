import {City} from '../city/types/types';
import {Rating} from '../place/type';
import {Bundle} from './type';

/* eslint-disable import/prefer-default-export */
export const bundleInitFetch = async (): Promise<Bundle[]> => {
  const res = await fetch('/api/bundles');
  const data = await res.json();
  return data;
};

export const bundlesInitFromCity = async (
  id: City['id']
): Promise<Bundle[]> => {
  const res = await fetch(`/api/cities/search/id/${id}`);
  const data = await res.json();
  return data.Bundles;
};

export const bundleAddFetch = async ({
  title,
  description,
  isPublic,
  userId,
  cityId,
  bundlePlaces,
}: {
  title: string;
  description: string;
  isPublic: boolean;
  userId: number;
  cityId: number;
  bundlePlaces: number[];
}): Promise<Bundle> => {
  console.log('Фетч улетел');

  const res = await fetch('/api/bundles', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      title,
      description,
      isPublic,
      userId,
      cityId,
      bundlePlaces,
    }),
  });
  const data = await res.json();
  return data;
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
  return data;
};
