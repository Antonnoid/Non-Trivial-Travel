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
        <h5 className="comment__user">
          {comment.User?.name} - ({comment.User?.email})
        </h5>
        <p className="comment__text">{comment.text}</p>
      </div>
    </div>
  );
}
