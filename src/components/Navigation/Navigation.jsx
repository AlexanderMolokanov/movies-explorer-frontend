import { Link, NavLink } from 'react-router-dom';
import React from 'react';

function Navigation({ todoClose }) {
  return (
    <div className="navigation__overlay">
      <div onClick={todoClose} className="navigation__container-empty"></div>
      <div className="navigation__container">
        <button className="navigation__cl-button" onClick={todoClose}></button>
        <nav className="navigation__nav">
          <NavLink
            exact
            to="/"
            onClick={todoClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={todoClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={todoClose}
            className="navigation__link"
            activeClassName="navigation__link_active">
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" onClick={todoClose} className="navigation__account-button">
          Аккаунт
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
