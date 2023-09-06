import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Rate} from 'antd';
import {Bundle} from './type';
import PlaceCard from '../place/PlaceCard';
import CommentsListPage from '../comment/CommentsListPage';

import './styles/styles.scss';

const BundlePage = (): JSX.Element => {
  const [rating, setRating] = useState(0);
  const {bundleId} = useParams();
  const bundles = useSelector((store: RootState) => store.bundles.bundles);

  let ourBundle;
  let ourPlaces;
  if (bundleId) {
    ourBundle = bundles.find((bundle: Bundle) => bundle.id === +bundleId);
    ourPlaces = ourBundle?.Bundle_places.map(
      (bundlePlace) => bundlePlace.Place
    ).flat();
  }

  const handleRatingChange = (value: number): void => {
    setRating(value);
  };

  return (
    <div className="bundle__container">
      <div className="bundle__text">
        <h1 className="bundle__title">{ourBundle?.title}</h1>
      </div>
      <div className="bundle__cards">
        {ourPlaces?.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <div className="bundle__comments">
        <CommentsListPage />
      </div>
      <div className="bundle__text">
        <h2 className="bundle__desc">{ourBundle?.description}</h2>
      </div>
      <div className="rating">
        <Rate onChange={handleRatingChange} />
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default BundlePage;
