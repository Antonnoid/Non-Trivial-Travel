import React from 'react';
import {Link} from 'react-router-dom'
import {Place} from './type';

function PlaceCard({place}: {place: Place}): JSX.Element {
  return (
    <>
    <Link className='gamePage' to={`/places/${place.id}`}>
      <div className="place">
        <div className="place__body">
          <h1 className="place__title">{place.title}</h1>
          <p className="place__description">{place.description}</p>
        </div>
      </div>
      </Link>
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
