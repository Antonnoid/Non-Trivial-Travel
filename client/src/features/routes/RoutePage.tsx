import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rate} from 'antd';
import {RootState, useAppDispatch} from '../../redux/store';
import {Route} from './type';
import PlaceCard from '../place/PlaceCard';

import './styles/stylesPage.scss';
import {ratingRouteAdd} from '../rating/ratingsSlice';

const RoutePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState(0);
  const {routeId} = useParams();
  const routes = useSelector((store: RootState) => store.routes.routes);
  const ratings = useSelector((store: RootState) => store.ratings.ratings);

  let ourRoute: Route | undefined;
  let ourPlaces;
  let ourRating;
  let averageRating;
  if (routeId) {
    ourRoute = routes.find((route: Route) => route.id === +routeId);
    ourPlaces = ourRoute?.Route_places?.map(
      (routePlace) => routePlace.Place
    ).flat();
    ourRating = ratings.filter(
      (el) => el.itemId === +routeId && el.type === 'route'
    );
    averageRating =
      ourRating.reduce((acc, el) => el.rate + acc, 0) / ourRating.length;
  }

  const handleRatingChange = (value: number): void => {
    setRating(value);
    if (ourRoute) {
      dispatch(ratingRouteAdd({rate: value, route: ourRoute}));
    }
  };

  return (
    <div className="router__container">
      <div className="bundle__text">
        <h1 className="bundle__title">{ourRoute?.title}</h1>
      </div>
      <div className="rating">
        <p className="rating-number">Оценить маршрут</p>
        <Rate onChange={handleRatingChange} />
      </div>
      <div className="bundle__cards">
        {ourPlaces?.map((place) => (
          <PlaceCard place={place} key={place.id} />
        ))}
      </div>
      <div className="bundle__text">
        <h2 className="bundle__desc">{ourRoute?.description}</h2>
      </div>
    </div>
  );
};

export default RoutePage;
