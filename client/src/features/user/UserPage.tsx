import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../redux/store';
import PlaceCard from '../place/PlaceCard';
import {placePublish} from '../place/placesSlice';
import {Place} from '../place/type';
import './style/styles.scss';
import RouteCard from '../routes/RouteCard';
import BundleCard from '../bundle/BundleCard';

const UserPage = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.user);
  const allPlaces = useSelector((store: RootState) => store.places.allPlaces);
  const allCities = useSelector((store: RootState) => store.cities.allCities);
  const allRoutes = useSelector((store: RootState) => store.routes.allRoutes);
  const allBundles = useSelector(
    (store: RootState) => store.bundles.allBundles
  );
  const dispatch = useAppDispatch();

  const handlePublishPlace = async (place: Place): Promise<void> => {
    dispatch(placePublish(place));
  };

  let userPlaces;
  let userCity;
  let userRoutes;
  let userBundles;
  if (user) {
    userPlaces = allPlaces.filter((place) => place.userId === user.id);
    userCity = allCities.find((city) => city.id === user.cityId);
    userRoutes = allRoutes.filter((route) => route.userId === user.id);
    userBundles = allBundles.filter((bundle) => bundle.userId === user.id);
  }

  return (
    <div className="account_page-container">
      {user ? (
        <div>
          <div className="account-container">
            <div className="account-info-container">
              <h1 className="account-info-title">Информация о пользователе:</h1>
              <p className="account-info-name">Ваше имя: {user?.name}</p>
              <div>
                <div>
                  <p className="account-info-city">Ваш город: {userCity?.name}</p>
                </div>
              </div>
            </div>
            <div className="account_addButtons">
              <h1 className="account_text-title">Добавить</h1>
              <div className="account_addButtons-button">
                <button className="account_button" type="button">
                  <NavLink to="/place/add">Место</NavLink>
                </button>
                <button className="account_button" type="button">
                  <NavLink to="/routes/add">Маршрут</NavLink>
                </button>
                <button className="account_button" type="button">
                  <NavLink to="/bundles/add">Подборка</NavLink>
                </button>
              </div>
            </div>
            
            {userPlaces && userPlaces.length > 0 && (
              <div className="account_places">
                <h1 className="account_text-title">Ваши места</h1>
                <div className="places">
                  {userPlaces?.map((place) => (
                    <div>
                      <PlaceCard key={place.id} place={place} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userRoutes && userRoutes.length > 0 &&  (
              <div className="account_routes">
                <h1 className="account_text-title">Ваши маршруты</h1>
                <div className="routes">
                  {userRoutes?.map((route) => (
                    <div>
                      <RouteCard key={route.id} route={route} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userBundles && userBundles.length > 0 && (
              <div className="account_bundles">
                <h1 className="account_text-title">Ваши подборки</h1>
                <div className="bundles">
                  {userBundles?.map((bundle) => (
                    <div>
                      <BundleCard key={bundle.id} bundle={bundle} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="account_addButtons">
            <h1 className=" account_text-title">
              Нет прав для доступа к странице
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
