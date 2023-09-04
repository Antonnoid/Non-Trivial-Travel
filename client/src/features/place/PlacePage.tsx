import React from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Image, Place} from './type';
import {RootState} from '../../redux/store';

function PlacePage(): JSX.Element {
  const {placeId} = useParams();
  const places = useSelector((store: RootState) => store.places.places);
  let ourPlace 
  if (placeId) {
    ourPlace = places.find((place: Place) => place.id === +placeId)!!;
  }
  const images = useSelector((store: RootState) => store.images.images);
  return ( 
    <div>
    {ourPlace ? (<div>
      <h1>{ourPlace.title}</h1>
      <div>{ourPlace.rating}</div>
      <div>
        {images.map((image: Image) => (
          <img src={image.url} alt="..." />
        ))}
      </div>
      <h3>{ourPlace.description}</h3>
    </div>) : (
      <div>
      <p>Ты ошибся переулком</p>
      </div>
    )}
    </div>
  );
}

export default PlacePage;
