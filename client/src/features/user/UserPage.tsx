import React from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import PlaceCard from '../place/PlaceCard';
import {placePublish} from '../place/placesSlice';
import {Place} from '../place/type';
import './styles/styles.scss';

const UserPage = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.user);
  const places = useSelector((store: RootState) => store.places.places);
  const cities = useSelector((store: RootState) => store.cities.cities);
  const dispatch = useAppDispatch();

  const handlePublishPlace = async (place: Place): Promise<void> => {
    dispatch(placePublish(place));
  };

  let userPlaces;
  let userCity;
  if (user) {
    userPlaces = places.filter((place) => place.userId === user.id);
    userCity = cities.find((city) => city.id === user.cityId);
  }

  return (
    <div className="account-container">
      {user ? (
        <div>
          <h1>Здравствуй, странник!</h1>

          <p>Твое имя: {user.name}</p>
          {userCity && (
            <div>
              <div>
                <p>Твой город: {userCity.name}</p>
              </div>
              <div>
                <button type="button">Добавить место</button>
                <button type="button">Добавить маршрут</button>
                <button type="button">Добавить подборку </button>
              </div>
            </div>
          )}
          {userPlaces && (
            <div>
              {userPlaces.length > 0 ? (
                <div>
                  <h1>Твои места</h1>
                  <div  className="places">
                    {userPlaces.map((place) => (
                      <div>
                        <PlaceCard key={place.id} place={place} />
                        <input
                          onChange={() => handlePublishPlace(place)}
                          type="checkbox"
                          checked={place.isPublic}
                        />
                        <button type="button">Изменить</button>
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
