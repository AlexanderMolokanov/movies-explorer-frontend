import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo_new.svg";
import menu from "../../images/burger-button.svg";
import proflogo from "../../images/profile-logo-man.svg";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header({ isLogged }) {
  const [isClicked, setIsClicked] = useState(false);
  console.log("isLogged-in-Header");
  console.log(isLogged);

  const { pathname } = useLocation();
  function todoOpen() {
    setIsClicked(true);
  }
  function todoClose() {
    setIsClicked(false);
  }

  const isFirstPage = pathname === "/";
  // console.log(isFirstPage);

  const headerFromColor = `${isFirstPage ? "header header_blue" : "header"}`;
  const headerButtonColor = `${
    isFirstPage
      ? "header_blue header__account-button "
      : "header_black header__account-button"
  }`;

  return (
    <>
      {!isLogged ? (
        <header
          // className="header"
          className={headerFromColor}
          id="header"
        >
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__buttons-container_films">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className={headerFromColor} id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="логотип" />
          </Link>
          <div className="header__buttons-container_films">
            <NavLink
              to="/movies"
              className="header__button"
              activeClassName="header__button_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="header__button  header__button_saved-films"
              activeClassName="header__button_active"
            >
              Сохранённые фильмы
            </NavLink>
            <div className="header__account-button-container ">
              <Link to="/profile" className={headerButtonColor}>
                <img
                  className="header__prof-butt-man"
                  src={proflogo}
                  alt="человечек"
                />{" "}
                &nbsp;Аккаунт
              </Link>
            </div>
          </div>
          <div className="header__buttons-container">
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
