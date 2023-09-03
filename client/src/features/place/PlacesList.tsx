import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../redux/store';
import PlaceCard from './PlaceCard';
import {Place} from './type';
import {cityPlacesInit, placesInit} from './placesSlice';

function PlacesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {cityId} = useParams();

  const places = useSelector((store: RootState) => store.places.places);
  useEffect(() => {
    if (!cityId) {
      dispatch(placesInit());
    } else {
      dispatch(cityPlacesInit(+cityId));
    }
  }, [cityId]);

  return (
    <div className="container">
      <div className="places">
        {places.map((place: Place) => (
          <PlaceCard place={place} key={place.id} />
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
