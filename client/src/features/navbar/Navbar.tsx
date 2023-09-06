/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef, useState} from 'react';
import {NavLink, Outlet, useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {loadCitiesByLetter, loadCitiesPopular} from '../city/citiesSlice';
import * as api from '../city/api';
import {City} from '../city/types/types';
import {logOut} from '../auth/authSlice';
import DropList from '../droplist/DropList';

export default function Navbar(): JSX.Element {
  const {cityId} = useParams();
  const [allCity, setAllCity] = useState(true);
  const [placeholder, setPlaceholder] = useState('Все города');
  const [input, setInput] = useState('');
  const [dropList, showDropList] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cities = useSelector((store: RootState) => store.cities.cities);
  const user = useSelector((store: RootState) => store.auth.user);

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

  const userLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
  };
  const onClickCity = (e?: any): void => {
    setInput('');
    showDropList(false);
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
        setInput('');
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
        <div className="mid">
          <div className="navbar__body container">
            <div style={{display: 'flex', alignItems: 'center'}}>
              <form action="" className="form navbar__form">
                <div className="form__body">
                  <input
                    onFocus={() => showDropList((prev) => !prev)}
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    className="form__input"
                    type="text"
                    placeholder={placeholder}
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
              </form>
              <NavLink className="navbar__link" to="/">
                Главная
              </NavLink>
            </div>
            {!user ? (
              <li className="nav_li">
                <NavLink className="navbar__link" to="/registration">
                  Регистрация
                </NavLink>

                <NavLink className="navbar__link" to="/authorization">
                  Войти
                </NavLink>
              </li>
            ) : (
              <>
                <NavLink
                  className="navbar__link navbar__user_hello"
                  to={`/user/${user.id}`}
                >
                  Привет, <span className="username">{user.name}</span>
                </NavLink>
                <li className="navbar__link">
                  <a onClick={userLogOut} href="/">
                    Выход
                  </a>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
