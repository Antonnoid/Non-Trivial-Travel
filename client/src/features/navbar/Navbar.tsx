import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink, Outlet, useParams, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {loadCitiesByLetter, loadCitiesPopular} from './citiesSlice';
import * as api from './api';
import CityItem from './CityItem';
import {City} from './types/types';
import {logOut} from '../auth/authSlice';

export default function Navbar(): JSX.Element {
  const {cityId} = useParams();

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

  // const userLogOut = async (): Promise<void> => {
  //   const data = await fetchLogOut();
  //   if (data.message === 'success') {
  //     dispatch({type: 'auth/logout'});
  //     navigate('/');
  //   }
  // };
  const userLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    dispatch(logOut());
    navigate('/');
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
        <div className="mid">
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
                    <li className="drop-down__item">
                      <Link onClick={() => setPlaceholder('Все города')} to="/">
                        Все города
                      </Link>
                    </li>
                    {cities.map((city) => (
                      <CityItem key={city.id} city={city} />
                    ))}
                  </ul>
                )}
              </div>
            </form>
            {!user ? (
              <li className="nav_li">
                <NavLink className="navbar__link" to="/registration">
                  Регистрация
                </NavLink>

                <NavLink className="navbar__link" to="/authorization">
                  Войти
                </NavLink>
              </li>
              <NavLink className="navbar__link" to={`/user/${user.id}`}>
                Личный кабинет
              </NavLink>
            </>
          )}
            ) : (
              <>
                <li className="navbar__link navbar__user_hello">
                  <a href="/"> Привет, {user.name} </a>
                </li>
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
