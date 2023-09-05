import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Image, Place} from './type';
import {RootState} from '../../redux/store';
import ImageItem from '../image/ImageItem';

import CommentsListPage from '../comment/CommentsListPage';

function PlacePage(): JSX.Element {
  const {placeId} = useParams();
  const places = useSelector((store: RootState) => store.places.places);
  const images = useSelector((store: RootState) => store.images.images);
  let ourPlace;
  let ourImages;
  if (placeId) {
    ourPlace = places.find((place: Place) => place.id === +placeId)!!;
    ourImages = images.filter((image: Image) => image.placeId === +placeId)!!;
  }

  return (
    <div>
      {ourPlace ? (
        <>
          <div>
            <h1>{ourPlace.title}</h1>
            <div>{ourPlace.rating}</div>
            <div>
              {ourImages?.map((image: Image) => (
                <ImageItem image={image} key={image.id} />
              ))}
            </div>
            <h3>{ourPlace.description}</h3>
          </div>
          <CommentsListPage />
        </>
      ) : (
        <div>
          <p>Ты ошибся переулком</p>
        </div>
      )}
    </div>
  );
}

export default PlacePage;
