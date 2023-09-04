/* eslint-disable import/prefer-default-export */
import {City} from '../navbar/types/types';
import {Place, PlaceId} from './type';

export const placesInitFetch = async (): Promise<Place[]> => {
  const res = await fetch('/api/places');
  const data = await res.json();
  return data;
};

export const placesInitFromCity = async (id: City['id']): Promise<Place[]> => {
  const res = await fetch(`/api/cities/search/id/${id}`);
  const data = await res.json(); // город
  return data.Places; // ключ Places, в котором лежат места этого города
};

export const placePageFetch = async (id: PlaceId): Promise<Place> => {
  const res = await fetch(`/api/places/${id}`);
  const data = res.json();
  return data;
};
