import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rate} from 'antd';
import {RootState, useAppDispatch} from '../../redux/store';
import {Bundle} from './type';
import PlaceCard from '../place/PlaceCard';
import CommentsListPage from '../comment/CommentsListPage';

import './styles/styles.scss';
import {ratingBundleAdd} from '../rating/ratingsSlice';

const BundlePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {bundleId} = useParams();
  const bundles = useSelector((store: RootState) => store.bundles.bundles);
  const ratings = useSelector((store: RootState) => store.ratings.ratings);

  let ourBundle: Bundle | undefined;
  let ourPlaces;
  let ourRating;
  let averageRating;
  if (bundleId) {
    ourBundle = bundles.find((bundle: Bundle) => bundle.id === +bundleId);
    ourPlaces = ourBundle?.Bundle_places?.map(
      (bundlePlace) => bundlePlace.Place
    ).flat();
    ourRating = ratings.filter(
      (el) => el.itemId === +bundleId && el.type === 'bundle'
    );
    averageRating =
      ourRating.reduce((acc, el) => el.rate + acc, 0) / ourRating.length;
  }

  const handleRatingChange = (value: number): void => {
    setRating(value);
    if (ourBundle) {
      dispatch(ratingBundleAdd({rate: value, bundle: ourBundle}));
    }
  };

  return (
    <div className="bundle__container">
      <div className="bundle__text">
        <h1 className="bundle__title">{ourBundle?.title}</h1>
      </div>
      <div className="rating bundle__rating">
        <p className="rating-number">Оценить подборку</p>
        <Rate onChange={handleRatingChange} />
      </div>
      <div className="bundle__cards">
        {ourPlaces?.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      <div className="bundle__text">
        <h2 className="bundle__desc">{ourBundle?.description}</h2>
      </div>
      <div className="bundle__comments">
        <CommentsListPage />
      </div>
    </div>
  );
};

export default BundlePage;
