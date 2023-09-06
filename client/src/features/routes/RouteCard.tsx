import React from 'react';
import {Link} from 'react-router-dom';
import {Route} from './type';

const RouteCard = ({route}: {route: Route}): JSX.Element => {
  return (
    <div className="routeCard">
      <img className="route__img" src="/" alt="img" />
      <div className="route">
        <div className="route__body">
          <h1 className="route__title">{route.title}</h1>
          {/* <p className="route__description">{route.description}</p> */}
          <div className="route__links">
            <Link
              className="route__link route__link_more"
              to={`/routes/${route.id}`}
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
