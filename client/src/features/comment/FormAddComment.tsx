import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

import {useAppDispatch} from '../../redux/store';
import {addCommentPlace} from './commentsPlaceSlice';
import {addCommentBundle} from './commentsBundleSlice';
import {addCommentRoute} from './commentsRouteSlice';

export default function FormAddComment(): JSX.Element {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const {placeId} = useParams();
  const {bundleId} = useParams();
  const {routeId} = useParams();
  const addCommentInPlaceHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (placeId) {
      dispatch(addCommentPlace({text, placeId}));
      setText('');
    }
  };
  const addCommentInBundle = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (bundleId) {
      dispatch(addCommentBundle({text, bundleId}));
      setText('');
    }
  };
  const addCommentInRoute = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (routeId) {
      dispatch(addCommentRoute({text, routeId}));
      setText('');
    }
  };
  return (
    <form
      className="comment__form"
      onSubmit={(e) => {
        if (placeId) {
          addCommentInPlaceHandler(e);
          return;
        }
        if (routeId) {
          addCommentInRoute(e);
          return;
        }
        if (bundleId) {
          addCommentInBundle(e);
        }
      }}
      action=""
    >
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
