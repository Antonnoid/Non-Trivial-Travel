import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {placeAddfromForm} from './placesSlice';
import DropList from '../droplist/DropList';
import {loadCitiesByLetter, loadCitiesPopular} from '../city/citiesSlice';

export default function FormAdd(): JSX.Element {
  const [message, setMessage] = useState('');

  const [description, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');
  const [allCity, setAllCity] = useState(false);

  const dispatch = useAppDispatch();
  const addPlace = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (
      title.trim() !== '' &&
      description.trim() !== '' &&
      city.trim() !== ''
    ) {
      const result = await dispatch(
        placeAddfromForm({title, description, city})
      );
      if (placeAddfromForm.fulfilled.match(result)) {
        setMessage('Добавлено');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setMessage('Ошибка добавления');
        setTimeout(() => {
          setMessage('');
        }, 2000);
      }
    } else {
      setMessage('Заполните все поля');
      setTimeout(() => {
        setMessage('');
      }, 2000);
    }
  };
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const cities = useSelector((store: RootState) => store.cities.cities);
  const [placeholder, setPlaceholder] = useState('Все города');
  const [dropList, showDropList] = useState(false);
  const [disable, setDisabled] = useState(true);

  const initCities = async (): Promise<void> => {
    if (city) {
      dispatch(loadCitiesByLetter(city.toLowerCase()));
      return;
    }
    if (!city) {
      dispatch(loadCitiesPopular());
    }
  };
  useEffect(() => {
    initCities();
  }, [city]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        dropList &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        showDropList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropList]);
  const onClickCity = (e: any): void => {
    e.preventDefault();
    showDropList(false);
    setPlaceholder('');
    setCity(e.target.innerHTML);
    if (dropList) setDisabled(false);
  };

  return (
    <div className="addPlaceForm_container">
      <form className="addPlaceForm" onSubmit={addPlace}>
        <input
          value={title}
          onChange={(e): void => setTitle(e.target.value)}
          name="title"
          type="text"
          placeholder="Название"
        />
        <input
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          name="description"
          type="text"
          placeholder="Описание"
        />
        <div className="city">
          <input
            onFocus={() => showDropList(true)}
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDisabled(true);
            }}
            name="city"
            type="text"
            placeholder="Город"
            autoComplete="off"
          />
          {dropList && (
            <DropList
              allCity={allCity}
              dropDownRef={dropDownRef}
              cities={cities}
              setPlaceholder={setPlaceholder}
              onClickCity={onClickCity}
            />
          )}
        </div>
        <div className="message">{message}</div>
        <button disabled={disable} type="submit">
          Добавить место
        </button>
      </form>
    </div>
  );
}
