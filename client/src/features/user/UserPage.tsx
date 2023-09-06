import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../redux/store';
import PlaceCard from '../place/PlaceCard';
import {placePublish} from '../place/placesSlice';
import {Place} from '../place/type';
// import './styles/styles.scss';


const UserPage = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.user);
  const allPlaces = useSelector((store: RootState) => store.places.allPlaces);
  const cities = useSelector((store: RootState) => store.cities.cities);
  const dispatch = useAppDispatch();

  const handlePublishPlace = async (place: Place): Promise<void> => {
    dispatch(placePublish(place));
  };

  let userPlaces;
  let userCity;
  if (user) {
    userPlaces = allPlaces.filter((place) => place.userId === user.id);
    userCity = cities.find((city) => city.id === user.cityId);
  }

  return (
    <div className="account-container">
      {user ? (
        <div>
          <h1>Информация о пользователе</h1>

          <p>Имя: {user.name}</p>
          {userCity && (
            <div>
              <div>
                <p>Город: {userCity.name}</p>
              </div>
              <div>
                <button type="button">Добавить место</button>
                <button type="button">Добавить маршрут</button>
                <button type="button">
                  <NavLink to="/bundles/add">Добавить подборку</NavLink>
                </button>
              </div>
            </div>
          )}
          {userPlaces && (
            <div>
              {userPlaces.length > 0 ? (
                <div>
                  <h1>Места</h1>
                  <div className="places">
                    {userPlaces.map((place) => (
                      <div>
                        <PlaceCard key={place.id} place={place} />
                        Опубликовано
                        <input
                          onChange={() => handlePublishPlace(place)}
                          type="checkbox"
                          checked={place.isPublic}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h1> Добавь места</h1>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Такого пользователя нет! Странник, будь добр, пройди на регу</h1>
        </div>
      )}
    </div>
  );
};

export default UserPage;
