import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Place} from './type';
import {RootState, useAppDispatch} from '../../redux/store';

import {placeRemove} from './placesSlice';

function PlaceCard({place}: {place: Place}): JSX.Element {
  const images = useSelector((store: RootState) => store.images.images); // временно
  const dispatch = useAppDispatch();
  const removePlace = async (): Promise<void> => {
    dispatch(placeRemove(place.id));
  };

  console.log(images, 'imgimg');

  return (
    <>
      <div className="gamePage">
        <img className="place__body-img" src={images[0].url} alt="img" />
        <div className="place">
          <div className="place__body">
            <div className="place__element">
              <h1 className="place__title">{place.title}</h1>
              <div className="place__links">
                <Link
                  className="place__link place__link_update"
                  to={`/places/${place.id}`}
                >
                  Изменить
                </Link>
                {/* <div className="place__links-published">
                  <label htmlFor="public">Публиковать</label>
                  <input type="checkbox" name="public" id="" />
                </div> */}
                {}
                <button
                  type="button"
                  onClick={removePlace}
                  className="place__link place__link_remove"
                >
                  Удалить
                </button>
                <Link
                  className="place__link place__link_more"
                  to={`/places/${place.id}`}
                >
                  Подробнее
                </Link>
              </div>
            </div>
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
