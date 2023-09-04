import React from 'react';
import {CommentOfPlace, CommentOfBundle, CommentOfRoute} from './types/types';

export default function CommentItem({
  comment,
}: {
  comment: CommentOfPlace | CommentOfBundle | CommentOfRoute;
}): JSX.Element {
  return (
    <div className="comment">
      <div className="comment__body">
        <h5 className="comment__user">Usename</h5>
        <p className="comment__text">{comment.text}</p>
        <form action="">
          <input className="comment__input" name="comment" type="text" />
          <button className="comment__submit" type="submit">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
}
