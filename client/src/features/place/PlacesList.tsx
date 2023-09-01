import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import PlaceCard from './PlaceCard';
import { Place } from './type';

function PlacesList(): JSX.Element {
  const places = useSelector((store: RootState) => store.places.places);
  return (
    <div>
      {places.map((place:Place) => (
        <PlaceCard place={place} key={place.id} />
      ))}
    </div>
  );
}

export default PlacesList;
