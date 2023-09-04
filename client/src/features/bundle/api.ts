import {City} from '../navbar/types/types';
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
