import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo_new.svg";
import menu from "../../images/burger-button.svg";
import React, { useState } from "react";

export default function Header({ isLogged }) {
  const [isClicked, setIsClicked] = useState(false);
  console.log("isLogged-in-Header")
  console.log(isLogged)
  function todoOpen() {
    setIsClicked(true);
  }
  function todoClose() {
    setIsClicked(false);
  }
  return (
    <>
      {!isLogged ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <d  iv className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </d>
        </header>
      ) : (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__button-container_films">
            <NavLink
              to="/movies"
              className="header__button"
              activeClassName="header__button_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="header__button  header__button_save-films"
              activeClassName="header__button_active"
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              Аккаунт
            </Link>
            <button onClick={todoOpen} className="header__burger-button">
              <img
                className="header__burger-button-img"
                src={menu}
                alt="меню"
              />
            </button>
          </div>
          {isClicked ? <Navigation todoClose={todoClose} /> : ""}
        </header>
      )}
    </>
  );
}
