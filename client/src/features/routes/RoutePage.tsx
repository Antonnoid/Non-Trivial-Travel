import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Rate} from 'antd';
import {Route} from './type';
import PlaceCard from '../place/PlaceCard';

import './styles/stylesPage.scss';

const RoutePage = (): JSX.Element => {
  const [rating, setRating] = useState(0);
  const {routeId} = useParams();
  const routes = useSelector((store: RootState) => store.routes.routes);

  let ourRoute;
  let ourPlaces;
  if (routeId) {
    ourRoute = routes.find((route: Route) => route.id === +routeId);
    ourPlaces = ourRoute?.Route_places.map(
      (routePlace) => routePlace.Place
    ).flat();
  }

  const handleRatingChange = (value: number): void => {
    setRating(value);
  };

  return (
    <div className="router__container">
      <div className="bundle__text">
        <h1 className="bundle__title">{ourRoute?.title}</h1>
      </div>
      <div className="bundle__cards">
        {ourPlaces?.map((place) => (
          <PlaceCard place={place} key={place.id} />
        ))}
      </div>
      <div className="bundle__text">
        <h2 className="bundle__desc">{ourRoute?.description}</h2>
      </div>
      <div className="rating">
        <Rate onChange={handleRatingChange} />
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default RoutePage;
