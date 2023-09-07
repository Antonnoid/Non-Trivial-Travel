import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {Place} from '../place/type';
import {City} from '../city/types/types';
import {addRoute} from './routesSlice';

const RouteAddPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allPlaces = useSelector((store: RootState) => store.places.allPlaces);
  const allCities = useSelector((store: RootState) => store.cities.allCities);
  const userId = useSelector((store: RootState) => store.auth.user)?.id;

  const [findPlace, setFindPlace] = useState('');

  const [routePlaces, setRoutePlaces] = useState<Place[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [findCity, setFindCity] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [timeValue, setTimeValue] = useState('');
  const [timeUnits, setTimeUnits] = useState('');
  const [routeCity, setCity] = useState<City>({id: 0, name: 'Не выбрано'});

  const filtredCities = allCities.filter((city) =>
    city.name.trim().toLowerCase().includes(findCity.trim().toLowerCase())
  );
  const filtredPlaces = allPlaces.filter(
    (place) =>
      place.title
        .trim()
        .toLowerCase()
        .includes(findPlace.trim().toLowerCase()) &&
      place.cityId === routeCity.id
  );

  const handleAddToRoute = (place: Place): void => {
    if (!routePlaces.find((el) => el.id === place.id)) {
      setRoutePlaces((prev) => [...prev, place]);
    }
  };

  const handleDeleteFromRoute = (place: Place): void => {
    setRoutePlaces((prev) =>
      prev.filter((prevPlace) => prevPlace.id !== place.id)
    );
  };

  const handleSetCity = (city: City): void => {
    setCity(city);
    setFindCity('');
  };

  const handleAddRoute = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (userId) {
      dispatch(
        addRoute({
          title,
          description,
          isPublic,
          time: ` `,
          cityId: routeCity.id,
          userId,
          routePlaces: routePlaces.map((place) => place.id),
        })
      );
    }
  };

  const liPlaces = filtredPlaces.map((place) => {
    return (
      <li>
        <button onClick={() => handleAddToRoute(place)} type="button">
          {place.title}
        </button>
      </li>
    );
  });

  const liCities = filtredCities.map((city) => {
    return (
      <li>
        <button onClick={() => handleSetCity(city)} type="button">
          {city.name}
        </button>
      </li>
    );
  });

  const addedPlaces = routePlaces.map((placeInRoute) => (
    <li>
      <div>
        <p>{placeInRoute.title}</p>
        <button
          onClick={() => {
            handleMoveUp(routePlaces, placeInRoute);
          }}
          type="button"
        >
          Переместить выше
        </button>
        <button
          onClick={() => handleMoveDown(routePlaces, placeInRoute )}
          type="button"
        >
          Переместить ниже
        </button>
        <button
          onClick={() => handleDeleteFromRoute(placeInRoute)}
          type="button"
        >
          Удалить
        </button>
      </div>
    </li>
  ));

  const handleMoveUp = (arr: Place[], place: Place): void => {
    const position = arr.indexOf(place);

    if (position > 0) {
      const newArr: Place[] = [];
      [...arr].map((el, i) => {
        if (i === position) {
          newArr.push(arr[i - 1]);
          return;
        }
        if (i === position - 1) {
          newArr.push(arr[i + 1]);
          return;
        }
        newArr.push(el);
      });
      setRoutePlaces([...newArr]);
    }
  };

  const handleMoveDown = (arr: Place[], place: Place): void => {
    const position = arr.indexOf(place);

    if (position + 1 < arr.length) {
      const newArr: Place[] = [];
      [...arr].map((el, i) => {
        if (i === position) {
          newArr.push(arr[i + 1]);
          return;
        }
        if (i === position + 1) {
          newArr.push(arr[i - 1]);
          return;
        }
        newArr.push(el);
      });
      setRoutePlaces([...newArr]);
    }
  };

  console.log(routePlaces);

  return (
    <div>
      <form onSubmit={handleAddRoute}>
        <div>
          <label>
            Выберите город
            <br />
            <input
              value={findCity}
              onChange={(e) => setFindCity(e.target.value)}
            />
          </label>
          {findCity && findCity.trim().toLowerCase() !== ' ' && (
            <ul style={{visibility: `${findCity ? 'visible' : 'collapse'}`}}>
              {liCities}
            </ul>
          )}
          <div>
            <h1>Маршрут по городу: {routeCity.name}</h1>
          </div>
        </div>
        <div>
          <label>
            Выберите места
            <br />
            <input
              value={findPlace}
              onChange={(e) => setFindPlace(e.target.value)}
            />
          </label>
          {findPlace && findPlace.trim().toLowerCase() !== ' ' && (
            <ul style={{visibility: `${findPlace ? 'visible' : 'collapse'}`}}>
              <li>
                <button onClick={() => setFindPlace('')} type="button">
                  Очистить поиск
                </button>
              </li>
              {liPlaces}
            </ul>
          )}
        </div>
        <label>
          <h1>Введите название</h1>
          <input onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          <h1>Введите описание</h1>
          <input onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          <h1>Опубликовать</h1>
          <input onChange={() => setIsPublic(!isPublic)} type="checkbox" />
        </label>
        <div>
          <button type="submit">Создать маршрут</button>
        </div>
      </form>
      <div>
        <h1>Места в подборке</h1>
        <ol>{addedPlaces}</ol>
      </div>
    </div>
  );
};

export default RouteAddPage;