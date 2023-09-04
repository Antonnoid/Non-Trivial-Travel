import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import PlaceCard from '../place/PlaceCard';

const UserPage = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.user);
  const places = useSelector((store: RootState) => store.places.places);
  const cities = useSelector((store: RootState) => store.cities.cities);

  console.log(places);

  let userPlaces;
  let userCity;
  if (user) {
    userPlaces = places.filter((place) => place.userId === user.id);
    userCity = cities.find((city) => city.id === user.cityId);
    console.log(userPlaces);
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Здравствуй, странник!</h1>

          <p>Твое имя: {user.name}</p>
          {userCity && (
            <div>
              <p>Твой город: {userCity.name}</p>
            </div>
          )}
          {userPlaces && (
            <div>
              {userPlaces.length > 0 ? (
                <div>
                  <h1>Твои места</h1>
                  {userPlaces.map((place) => (
                    <div>
                      <PlaceCard place={place} />
                      <input type="checkbox" checked={place.isPublic} />
                      <button type="button">Изменить</button>
                    </div>
                  ))}
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
