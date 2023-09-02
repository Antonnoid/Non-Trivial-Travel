import React from 'react';
import {Place} from './type';

function PlaceCard({place}: {place: Place}): JSX.Element {
  return (
    <>
      <h1>{place.title}</h1>

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
