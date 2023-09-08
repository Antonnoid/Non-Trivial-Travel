/* eslint-disable import/no-extraneous-dependencies */
import React, {useEffect} from 'react';
import {useLocation, useParams} from 'react-router';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {loadCommentsBundle} from './commentsBundleSlice';
import {loadCommentsPlace} from './commentsPlaceSlice';
import {loadCommentsRoute} from './commentsRouteSlice';
import CommentItem from './CommentItem';
import FormAddComment from './FormAddComment';

export default function CommentsListPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {placeId} = useParams();
  const {user} = useSelector((store: RootState) => store.auth);
  const forRoute = useSelector(
    (store: RootState) => store.commentsOfRoute.commentsRoute
  );
  const forPlace = useSelector(
    (store: RootState) => store.commentsOfPlace.commentsPlace
  );
  const forBundle = useSelector(
    (store: RootState) => store.commentsOfBundle.commentsBundle
  );

  const loadForBundle = async (): Promise<void> => {
    if (placeId) dispatch(loadCommentsBundle(+placeId));
  };
  const loadForPlace = async (): Promise<void> => {
    if (placeId) dispatch(loadCommentsPlace(+placeId));
  };
  const loadForRoute = async (): Promise<void> => {
    if (placeId) dispatch(loadCommentsRoute(+placeId));
  };

  const location = useLocation();

  const [bundlesName, routesName, placesName] = ['bundles', 'routes', 'places'];
  const {pathname} = location;
  useEffect(() => {
    if (pathname.includes(bundlesName)) {
      loadForBundle();
      return;
    }
    if (pathname.includes(placesName)) {
      loadForPlace();
      return;
    }
    if (pathname.includes(routesName)) {
      loadForRoute();
    }
  }, [pathname]);

  return (
    <div className="comments">
      <h2 className="comments__header">Комментарии</h2>
      {user && <FormAddComment />}
      {pathname.includes(placesName) && forPlace
        ? forPlace.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        : pathname.includes(placesName) && <p>Комментариев нет...</p>}
      {pathname.includes(bundlesName) && forBundle
        ? forBundle.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        : pathname.includes(bundlesName) && <p>Комментариев нет...</p>}
      {pathname.includes(routesName) && forRoute
        ? forRoute.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        : pathname.includes(routesName) && <p>Комментариев нет...</p>}
    </div>
  );
}
