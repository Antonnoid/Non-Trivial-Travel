import {CommentOfBundle, CommentOfPlace, CommentOfRoute} from './types';

export type CommentsOfPlaceState = {
  commentsPlace: CommentOfPlace[];
  error: string | undefined;
};
export type CommentsOfBundleState = {
  commentsBundle: CommentOfBundle[];
  error: string | undefined;
};
export type CommentsOfRouteState = {
  commentsRoute: CommentOfRoute[];
  error: string | undefined;
};
