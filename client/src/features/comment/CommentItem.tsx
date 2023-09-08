import React from 'react';
import {useSelector} from 'react-redux';
import {CommentOfPlace, CommentOfBundle, CommentOfRoute} from './types/types';
import {RootState, useAppDispatch} from '../../redux/store';
import {removeCommentPlace} from './commentsPlaceSlice';
import {useLocation} from 'react-router-dom';
import {removeCommentBundle} from './commentsBundleSlice';
import {removeCommentRoute} from './commentsRouteSlice';

export default function CommentItem({
  comment,
}: {
  comment: CommentOfPlace | CommentOfBundle | CommentOfRoute;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.user);
  const {pathname} = useLocation();
  const removeComment = async (): Promise<void> => {
    if (pathname.includes('places')) {
      dispatch(removeCommentPlace(comment.id));
      return;
    }
    if (pathname.includes('bundles')) {
      dispatch(removeCommentBundle(comment.id));
      return;
    }
    if (pathname.includes('routes')) {
      dispatch(removeCommentRoute(comment.id));
    }
  };

  return (
    <div className="comment">
      <div className="comment__body">
        <span className="comment__date">{`${comment.createdAt?.slice(
          0,
          10
        )} ${comment.createdAt?.slice(11, 19)}`}</span>
        <h5 className="comment__user">
          <span className="comment__autor">
            {comment.User?.id === user?.id ? 'Я ' : comment.User?.name}{' '}
          </span>
          <span className="comment__autor comment__autor_city">
            - г. {comment.User?.City?.name}:
          </span>
        </h5>
        <p className="comment__text">{comment.text}</p>
        {user && (user.isAdmin || comment.userId === user.id) && (
          <button
            onClick={removeComment}
            type="button"
            className="comment__delete"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
