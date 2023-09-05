
import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Bundle} from './type';
import PlaceCard from '../place/PlaceCard';

const BundlePage = (): JSX.Element => {
  const {bundleId} = useParams();
  const bundles = useSelector((store: RootState) => store.bundles.bundles);

  let ourBundle;
  let ourPlaces;
  if (bundleId) {
    ourBundle = bundles.find((bundle: Bundle) => bundle.id === +bundleId);
    ourPlaces = ourBundle?.Bundle_places.map((bundlePlace) => bundlePlace.Place).flat()
  }

  return (
    <div>
      <h1>{ourBundle?.title}</h1>
      <h2>{ourBundle?.description}</h2>
      <div>
        {ourPlaces?.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default BundlePage;
