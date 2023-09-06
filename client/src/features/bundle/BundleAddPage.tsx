import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const BundleAddPage = (): JSX.Element => {
  const places = useSelector((store: RootState) => store.places.places);
  const cities = useSelector((store: RootState) => store.cities.cities);

  const optionsPlaces = places.map((place) => {
    return (
      <option key={place.id} value={place.id}>
        {place.title}
      </option>
    );
  });

 
  

  const [bundlePlaces, setBundlePlaces] = useState<number[]>([]);
  const [bundleTitle, setBundleTitle] = useState('');
  const [bundleDescription, setBundleDescription] = useState('');
  const [findCity, setFindCity] = useState('');
  const [bundleIsPublished, setBundleIsPublished] = useState(false)
  console.log(bundleTitle);
  console.log(bundleDescription);
  console.log(bundleIsPublished);

  const filtredCities = cities.filter((city) => city.name.includes(findCity))
  console.log(filtredCities);

  

  const placesInBundle = places.filter((place) =>
    bundlePlaces.find((el) => el === place.id)
  );

  return (
    <div>
      <form>
        <div>
          <select
            placeholder="Выберите места для добавления"
            onChange={(e) =>
              setBundlePlaces((prev) => [...prev, Number(e.target.value)])
            }
          >
            <option disabled selected>
              Выберите место
            </option>
            {optionsPlaces}
          </select>
          <br />
        </div>
        <label>
          <h1>Введите название</h1>
          <input onChange={(e) => setBundleTitle(e.target.value)}/>
        </label>
        <label>
          <h1>Введите описание</h1>
          <input onChange={(e) => setBundleDescription(e.target.value)} />
        </label>
        <label>
          <h1>Выберите город</h1>
          <input onChange={(e) => setFindCity(e.target.value)}/>
        </label>
        <label>
          <h1>Опубликовать</h1>
          <input onChange={() => setBundleIsPublished(!bundleIsPublished)} type="checkbox" />
        </label>
        <div>
          <button type="submit">Создать подборку</button>
        </div>
      </form>
      <div>
        <h1>Места в подборке</h1>
        {placesInBundle
          .sort((a, b) => a.id - b.id)
          .map((placeInBundle) => (
            <div>
              <p>{placeInBundle.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BundleAddPage;
