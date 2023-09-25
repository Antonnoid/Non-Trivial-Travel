import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {Place} from '../place/type';
import { City } from '../city/types/types'; 
import {addBundle} from './bundlesSlice';


const BundleAddPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allPlaces = useSelector((store: RootState) => store.places.allPlaces);
  const allCities = useSelector((store: RootState) => store.cities.allCities);
  const userId = useSelector((store: RootState) => store.auth.user)?.id;

  const [findPlace, setFindPlace] = useState('');

  const [bundlePlaces, setBundlePlaces] = useState<number[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [findCity, setFindCity] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [bundleCity, setCity] = useState<City>({id: 0, name: 'Не выбрано'});

  const filtredCities = allCities.filter((city) =>
    city.name.trim().toLowerCase().includes(findCity.trim().toLowerCase())
  );
  const filtredPlaces = allPlaces.filter((place) =>
    place.title.trim().toLowerCase().includes(findPlace.trim().toLowerCase())
    && (place.cityId === bundleCity.id));

  const handleAddToBundle = (place: Place): void => {
    setBundlePlaces((prev) => [...prev, place.id]);
  };

  const handleDeleteToBundle = (place: Place): void => {
    setBundlePlaces((prev) =>
      prev.filter((prevPlace) => prevPlace !== place.id)
    );
  };

  const handleSetCity = (city: City): void => {
    setCity(city);
    setFindCity('');
  };

  const handleAddBundle = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (userId) {

      dispatch(
        addBundle({
          title,
          description,
          isPublic,
          cityId: bundleCity.id,
          userId,
          bundlePlaces,
        })
      );
    }
  };

  const liPlaces = filtredPlaces.map((place) => {
    return (
      <li>
        <button onClick={() => handleAddToBundle(place)} type="button">
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

  const placesInBundle = allPlaces.filter((place) =>
    bundlePlaces.find((el) => el === place.id)
  );

  const addedPlaces = placesInBundle
    .sort((a, b) => a.id - b.id)
    .map((placeInBundle) => (
      <div>
        <p>{placeInBundle.title}</p>
        <button
          onClick={() => handleDeleteToBundle(placeInBundle)}
          type="button"
        >
          Удалить
        </button>
      </div>
    ));

  return (
    <div>
      <form onSubmit={handleAddBundle}>
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
            <h1>Подборка для города: {bundleCity.name}</h1>
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
          <button type="submit">Создать подборку</button>
        </div>
      </form>
      <div>
        <h1>Места в подборке</h1>
        {addedPlaces}
      </div>
    </div>
  );
};

export default BundleAddPage;
