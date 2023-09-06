import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../redux/store';
import {addCommentPlace} from './commentsPlaceSlice';

export default function FormAddComment(): JSX.Element {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const {placeId} = useParams();
  const addCommentInPlaceHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (placeId) {
      dispatch(addCommentPlace({text, placeId}));
      setText('');
    }
  };
  return (
    <form onSubmit={addCommentInPlaceHandler} action="">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="comment__input"
        name="text"
        type="text"
      />
      <button className="comment__submit" type="submit">
        Добавить
      </button>
    </form>
  );
}
