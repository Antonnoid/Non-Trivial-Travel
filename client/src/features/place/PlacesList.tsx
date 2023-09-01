import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import PlaceCard from './PlaceCard';
import {Place} from './type';
import {placesInit} from './placesSlice';

function PlacesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const places = useSelector((store: RootState) => store.places.places);

  useEffect(() => {
    dispatch(placesInit());
  }, []);
  return (
    <div>
      {places.map((place: Place) => (
        <PlaceCard place={place} key={place.id} />
      ))}
    </div>
  );
}

export default PlacesList;
