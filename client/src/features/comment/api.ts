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
