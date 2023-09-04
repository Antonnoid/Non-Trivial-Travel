import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {Bundle} from './type';
import {Place} from '../place/type';
import PlaceCard from '../place/PlaceCard';
import {bundlesInit} from './bundlesSlice';

const BundlePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {bundleId} = useParams();
  const bundles = useSelector((store: RootState) => store.bundles.bundles);
  const places = useSelector((store: RootState) => store.places.places);
  let ourBundle;
  let ourPlaces;
  if (bundleId) {
    ourBundle = bundles.find((bundle: Bundle) => bundle.id === +bundleId)!!;
    ourPlaces = places.filter((place: Place) => place.bundleId === +bundleId);
  }
  useEffect(() => {
    dispatch(bundlesInit());
  }, []);
  return (
    <div>
      <h1>{ourBundle?.title}</h1>
      <h2>{ourBundle?.description}</h2>
      <div>
        {ourPlaces?.map((place) => (
          <PlaceCard place={place} key={place.id} />
        ))}
      </div>
    </div>
  );
};

export default BundlePage;
