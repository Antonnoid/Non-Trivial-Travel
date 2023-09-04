import React from 'react';
import {Link} from 'react-router-dom';
import {Place} from './type';
import {useAppDispatch} from '../../redux/store';
import * as api from './api';
import {placeRemove} from './placesSlice';

function PlaceCard({place}: {place: Place}): JSX.Element {
  const dispatch = useAppDispatch();
  const removePlace = async (): Promise<void> => {
    await api.placeRemove(place.id);
    dispatch(placeRemove(place.id));
  };
  return (
    <>
      <div className="gamePage">
        <div className="place">
          <div className="place__body">
            <h1 className="place__title">{place.title}</h1>
            <p className="place__description">{place.description}</p>
            <div className="place__links">
              <Link
                className="place__link place__link_more"
                to={`/places/${place.id}`}
              >
                Подробнее
              </Link>
              <button
                type="button"
                onClick={removePlace}
                className="place__link place__link_remove"
              >
                Удалить
              </button>
              <Link
                className="place__link place__link_update"
                to={`/places/${place.id}`}
              >
                Изменить
              </Link>
            </div>
            <label htmlFor="public">Опубликовано</label>
            <input type="checkbox" name="public" id="" />
          </div>
        </div>
      </div>
      {/* <img
        src={
          place.images[Math.floor(Math.random() * place.images.length + 1)].url
        }
        alt="..."
      /> */}
    </>
  );
}

export default PlaceCard;
