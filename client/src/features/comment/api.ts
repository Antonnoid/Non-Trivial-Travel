import {CommentOfBundle, CommentOfPlace, CommentOfRoute} from './types/types';

export const fetchCommentOfPlaces = async (): Promise<CommentOfPlace[]> => {
  const res = await fetch('/api/places');
  const data = await res.json();

  return data.Place_comments;
};
export const fetchCommentOfRoutes = async (): Promise<CommentOfRoute[]> => {
  const res = await fetch('/api/routes');
  const data = await res.json();
  return data.Route_comments;
};
export const fetchCommentOfBundles = async (): Promise<CommentOfBundle[]> => {
  const res = await fetch('/api/bundles');

  const data = await res.json();

  return data.Bundle_comments;
};
