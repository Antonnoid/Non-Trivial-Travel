import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import RouteCard from './RouteCard';
import {cityRoutesInit, routesInit} from './routesSlice';
import './styles/styles.scss';

const RoutesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {cityId} = useParams();

  useEffect(() => {
    if (!cityId) {
      dispatch(routesInit());
    } else {
      dispatch(cityRoutesInit(+cityId));
    }
  }, []);

  const routes = useSelector((store: RootState) => store.routes.routes);
  return (
    <div className="container">
      <div className="routeslist">
        <div className="routes_text-title">
          <h3>Маршруты</h3>
        </div>
        <div className="routes">
          {routes.length > 0 &&
            routes.map((route) => <RouteCard route={route} key={route.id} />)}
        </div>
      </div>
    </div>
  );
};

export default RoutesList;
