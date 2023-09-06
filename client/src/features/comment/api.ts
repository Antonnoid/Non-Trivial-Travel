import {Bundle} from '../bundle/type';
import {Place} from '../place/type';
import {Route} from '../routes/type';

import {CommentOfBundle, CommentOfPlace, CommentOfRoute} from './types/types';

// место по id => массив с комментариями
export const fetchCommentOfPlaces = async (
  id: Place['id']
): Promise<CommentOfPlace[]> => {
  const res = await fetch(`/api/places/${id}`);
  const data = await res.json();
  return data.Place_comments;
};

// маршрут по id => массив с комментариями
export const fetchCommentOfRoutes = async (
  id: Route['id']
): Promise<CommentOfRoute[]> => {
  const res = await fetch(`/api/routes/${id}`);
  const data = await res.json();
  return data.Route_comments;
};

// подборка по id => массив с комментариями
export const fetchCommentOfBundles = async (
  id: Bundle['id']
): Promise<CommentOfBundle[]> => {
  const res = await fetch(`/api/bundles/${id}`);
  const data = await res.json();
  return data.Bundle_comments;
};

// добавить комментарий к месту
export const fetchCommentAddInPlace = async ({
  text,
  placeId,
}: {
  text: string;
  placeId: string;
}): Promise<CommentOfPlace> => {
  const res = await fetch(`/api/comments/place`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({text, placeId}),
  });

  return res.json();
};

// добавить комментарий к маршруту
export const fetchCommentAddInRoute = async ({
  text,
  routeId,
}: {
  text: string;
  routeId: string;
}): Promise<Comment> => {
  const res = await fetch(`/api/comments/route`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({text, routeId}),
  });
  return res.json();
};

// добавить комментарий к подборке
export const fetchCommentAddInBundle = async ({
  text,
  bundleId,
}: {
  text: string;
  bundleId: string;
}): Promise<Comment> => {
  const res = await fetch(`/api/comments/bundle`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({text, bundleId}),
  });
  return res.json();
};

// удалить комментарий к месту

export const fetchCommentRemoveInPlace = async (
  id: CommentOfPlace['id']
): Promise<number> => {
  const res = await fetch(`/api/comments/place/${id}`, {method: 'DELETE'});
  return res.json();
};
