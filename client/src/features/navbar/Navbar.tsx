import React, {useEffect, useRef, useState} from 'react';
import {NavLink, Outlet, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {loadCitiesByLetter, loadCitiesPopular} from './citiesSlice';
import * as api from './api';
import CityItem from './CityItem';
import {City} from './types/types';

export default function Navbar(): JSX.Element {
  const {cityId} = useParams();

  const [placeholder, setPlaceholder] = useState('Выбрать город');
  const [input, setInput] = useState('');
  const [dropList, showDropList] = useState(false);

  const dispatch = useAppDispatch();
  const cities = useSelector((store: RootState) => store.cities.cities);

  const getCity = async (): Promise<City | undefined> => {
    if (cityId) {
      const data = await api.fetchCityById(+cityId);
      setPlaceholder(data.name);
      return data;
    }
  };

  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const initCities = async (): Promise<void> => {
    if (input) {
      dispatch(loadCitiesByLetter(input.toLowerCase()));
      return;
    }
    if (!input) {
      dispatch(loadCitiesPopular());
    }
  };

  useEffect(() => {
    initCities();
    getCity();
  }, [input, placeholder, cityId]);

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar__body container">
          <form action="" className="form navbar__form">
            <div className="form__body">
              <input
                onFocus={() => showDropList(true)}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="form__input"
                type="text"
                placeholder={placeholder}
              />
              {dropList && (
                <ul className="drop-down" ref={dropDownRef}>
                  {cities.length === 0 && (
                    <li className="drop-down__item">Такого города нет</li>
                  )}
                  {cities.map((city) => (
                    <CityItem key={city.id} city={city} />
                  ))}
                </ul>
              )}

              <button type="submit" className="btn form__submit">
                Поиск
              </button>
            </div>
          </form>
          <NavLink className="navbar__link" to="/">
            Регистрация
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
