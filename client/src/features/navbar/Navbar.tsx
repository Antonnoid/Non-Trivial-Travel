import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';

export default function Navbar(): JSX.Element {
  return (
    <>
      <nav className="navbar">
        <div className="navbar__body">
          <form action="" className="form navbar__form">
            <div className="form__body">
              <input type="text" placeholder="Город" />
              <button type="submit" className="btn form__submit">
                Поиск
              </button>
            </div>
          </form>
          <NavLink
            className={({isActive}) => (isActive ? 'active_link' : '')}
            to="/"
          >
            Регистрация
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
