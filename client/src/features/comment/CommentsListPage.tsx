import React, {useEffect} from 'react';
import {useLocation} from 'react-router';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {loadCommentsBundle} from './commentsBundleSlice';
import {loadCommentsPlace} from './commentsPlaceSlice';
import {loadCommentsRoute} from './commentsRouteSlice';
import CommentItem from './CommentItem';

export default function CommentsListPage(): JSX.Element {
  const dispatch = useAppDispatch();
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
    dispatch(loadCommentsBundle());
  };
  const loadForPlace = async (): Promise<void> => {
    dispatch(loadCommentsPlace());
  };
  const loadForRoute = async (): Promise<void> => {
    dispatch(loadCommentsRoute());
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
  }, []);

  return (
    <div className="comments">
      {pathname.includes(placesName) && forPlace ? (
        forPlace.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p>Комментариев нет...</p>
      )}
      {pathname.includes(bundlesName) && forBundle ? (
        forBundle.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p>Комментариев нет...</p>
      )}
      {pathname.includes(routesName) && forRoute ? (
        forRoute.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p>Комментариев нет...</p>
      )}
    </div>
  );
}
