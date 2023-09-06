import React from 'react';
import {CommentOfPlace, CommentOfBundle, CommentOfRoute} from './types/types';
import {useAppDispatch} from '../../redux/store';
import {removeCommentPlace} from './commentsPlaceSlice';

export default function CommentItem({
  comment,
}: {
  comment: CommentOfPlace | CommentOfBundle | CommentOfRoute;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const removeComment = async (): Promise<void> => {
    dispatch(removeCommentPlace(comment.id));
  };
  return (
    <div className="comment">
      <div className="comment__body">
        <h5 className="comment__user">
          <span className="comment__autor">{comment.User?.name}</span>
          <span className="comment__autor comment__autor_city">
            ({comment.User?.City?.name})
          </span>
        </h5>
        <p className="comment__text">{comment.text}</p>
        <button
          onClick={removeComment}
          type="button"
          className="comment__delete"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
