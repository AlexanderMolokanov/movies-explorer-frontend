import { Link, NavLink } from "react-router-dom";
import React from "react";
import proflogo from "../../images/profile-logo-man.svg";

export default function Navigation({ todoClose }) {
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
            activeClassName="navigation__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={todoClose}
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={todoClose}
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__account-button">
          <img
            className="header__prof-butt-man"
            src={proflogo}
            alt="человечек"
          />{" "}
          &nbsp;Аккаунт
        </Link>
      </div>
    </div>
  );
}
