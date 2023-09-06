import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Place} from '../place/type';
import {City} from '../city/types/types';

const BundleAddPage = (): JSX.Element => {
  const allPlaces = useSelector((store: RootState) => store.places.allPlaces);
  const allCities = useSelector((store: RootState) => store.cities.allCities);

  const [findPlace, setFindPlace] = useState('');
  console.log('-', findPlace.trim().toLowerCase(), '-');

  const [bundlePlaces, setBundlePlaces] = useState<number[]>([]);
  const [bundleTitle, setBundleTitle] = useState('');
  const [bundleDescription, setBundleDescription] = useState('');
  const [findCity, setFindCity] = useState('');
  const [bundleIsPublished, setBundleIsPublished] = useState(false);
  const [bundleCity, setCity] = useState<City>({id: 0, name: 'Не выбрано'});
  console.log(bundleCity);

  const filtredCities = allCities.filter((city) =>
    city.name.includes(findCity)
  );
  const filtredPlaces = allPlaces.filter((place) =>
    place.title.trim().toLowerCase().includes(findPlace.trim().toLowerCase())
  );

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
      <form>
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
          <input onChange={(e) => setBundleTitle(e.target.value)} />
        </label>
        <label>
          <h1>Введите описание</h1>
          <input onChange={(e) => setBundleDescription(e.target.value)} />
        </label>
        <label>
          <h1>Опубликовать</h1>
          <input
            onChange={() => setBundleIsPublished(!bundleIsPublished)}
            type="checkbox"
          />
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
