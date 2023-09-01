import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <>
      <nav className="navbar">
        <div className="navbar__body container">
          <form action="" className="form navbar__form">
            <div className="form__body">
              <input className="form__input" type="text" placeholder="Город" />
              <ul className="drop-down">
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
                <li className="drop-down__item">Город 1</li>
              </ul>
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
