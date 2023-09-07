import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rate} from 'antd';
import {Place} from './type';
import {RootState, useAppDispatch} from '../../redux/store';

import {placeRemove} from './placesSlice';

function PlaceCard({place}: {place: Place}): JSX.Element {
  console.log(place);

  const images = useSelector((store: RootState) => store.images.images);
  const user = useSelector((store: RootState) => store.auth.user);
  const rating = useSelector((store: RootState) => store.ratings.ratings);
  const placeImages = images.filter((image) => image.placeId === place.id);
  const ourRating = rating.filter(
    (el) => el.itemId === place.id && el.type === 'place'
  );
  const averageRating =
    ourRating.reduce((acc, el) => el.rate + acc, 0) / ourRating.length;

  const dispatch = useAppDispatch();
  const removePlace = async (): Promise<void> => {
    dispatch(placeRemove(place.id));
  };
  const randomImage =
    placeImages[Math.floor(Math.random() * (placeImages.length - 1))];

  return (
    <div className="place__card">
      <img className="place__body-img" src={randomImage?.url} alt="img" />
      <div className="place">
        <div className="place__element">
          <h1 className="place__title">{place.title}</h1>
          <Rate disabled defaultValue={averageRating} />
          <div className="place__links">
            {(user?.isAdmin || user?.id === place.userId) && (
              <>
                <Link
                  className="place__link place__link_update"
                  to={`/places/${place.id}`}
                >
                  Изменить
                </Link>

                <button
                  type="button"
                  onClick={removePlace}
                  className="place__link place__link_remove"
                >
                  Удалить
                </button>
              </>
            )}

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
  );
}

export default PlaceCard;
