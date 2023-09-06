import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Route} from './type';
import {RootState} from '../../redux/store';

const RouteCard = ({route}: {route: Route}): JSX.Element => {
  const routePlacesId = route.Route_places.map((el) => el.placeId);
  const images = useSelector((store: RootState) => store.images.images);
  const ourImages = images.filter((image) =>
    routePlacesId.find((id) => image.placeId === id)
  );
  const randomImage =
    ourImages[Math.floor(Math.random() * (ourImages.length - 1))];
  return (
    <div className="routeCard">
      <img className="route__img" src={randomImage?.url} alt="img" />
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
