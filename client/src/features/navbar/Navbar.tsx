import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {RootState, useAppDispatch} from '../../redux/store';
import {fetchLogOut} from '../auth/api';

export default function Navbar(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userLogOut = async (): Promise<void> => {
    const data = await fetchLogOut();
    if (data.message === 'success') {
      dispatch({type: 'auth/logout'});
      navigate('/');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__body container">
          <form action="" className="form navbar__form">
            <div className="form__body">
              <input className="form__input" type="text" placeholder="Город" />
              {/* <ul className="drop-down">
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
              </ul> */}
              <button type="submit" className="btn form__submit">
                Поиск
              </button>
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
      </nav>
      <Outlet />
    </>
  );
}
