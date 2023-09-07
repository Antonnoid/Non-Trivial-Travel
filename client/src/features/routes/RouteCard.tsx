import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Rate} from 'antd';
import {Route} from './type';
import {RootState, useAppDispatch} from '../../redux/store';
import {routerRemove} from './routesSlice';

const RouteCard = ({route}: {route: Route}): JSX.Element => {
  const dispatch = useAppDispatch();
  const routePlacesId = route.Route_places?.map((el) => el.placeId);
  const user = useSelector((store: RootState) => store.auth.user);
  const images = useSelector((store: RootState) => store.images.images);
  const rating = useSelector((store: RootState) => store.ratings.ratings);
  const ourImages = images.filter((image) =>
    routePlacesId?.find((id) => image.placeId === id)
  );
  const randomImage =
    ourImages[Math.floor(Math.random() * (ourImages.length - 1))];
  const ourRating = rating.filter(
    (el) => el.itemId === route.id && el.type === 'route'
  );
  const averageRating =
    ourRating.reduce((acc, el) => el.rate + acc, 0) / ourRating.length;

  const removeRoute = async (): Promise<void> => {
    dispatch(routerRemove(route.id));
  };
  return (
    <div className="routeCard">
      <img className="route__img" src={randomImage?.url} alt="img" />
      <div className="route">
        <div className="route__body">
          <h1 className="route__title">{route.title}</h1>

          <div className="route__links">
            <Rate
              className="route__rating"
              disabled
              defaultValue={averageRating}
            />
            <Link
              className="route__link route__link_more"
              to={`/routes/${route.id}`}
            >
              Подробнее
            </Link>
            {(user?.isAdmin || user?.id === route.userId) && (
              <button
                type="button"
                className="route__link route__link_more"
                onClick={removeRoute}
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
