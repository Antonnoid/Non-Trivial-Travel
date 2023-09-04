/* eslint-disable import/prefer-default-export */
import {City} from '../navbar/types/types';
import {Place, PlaceId, PlaceForAdd} from './type';

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
export const placeAdd = async (place: PlaceForAdd): Promise<Place> => {
  const res = await fetch(`/api/places`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(place),
  });
  return res.json();
};

export const placeRemove = async (id: Place['id']): Promise<PlaceId> => {
  const res = await fetch(`/api/places/${id}`, {method: 'DELETE'});
  return res.json();
};

export const placePageFetch = async (id: PlaceId): Promise<Place> => {
  const res = await fetch(`/api/places/${id}`);
  const data = res.json();
  return data;
};

export const placePublishFetch = async (place: Place): Promise<Place> => {
  const res = await fetch(`/api/places/${place.id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({isPublic: !place.isPublic}),
  });
  const data = res.json();
  
  return data;
};
