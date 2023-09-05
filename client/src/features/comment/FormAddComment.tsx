import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../redux/store';
import {addCommentsPlace} from './commentsPlaceSlice';

export default function FormAddComment(): JSX.Element {
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const {placeId} = useParams();
  const addCommentInPlaceHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (placeId) dispatch(addCommentsPlace({text: comment, placeId}));
  };
  return (
    <form onSubmit={addCommentInPlaceHandler} action="">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="comment__input"
        name="comment"
        type="text"
      />
      <button className="comment__submit" type="submit">
        Добавить
      </button>
    </form>
  );
}
