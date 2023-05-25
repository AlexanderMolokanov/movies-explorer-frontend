import { Link, NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo_new.svg";
import menu from "../../images/burger-button.svg";
import proflogo from "../../images/profile-logo-man.svg";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header({ isLogged }) {
  const [isClicked, setIsClicked] = useState(false);
  console.log("isLogged-in-Header")
  console.log(isLogged)

  const { pathname } = useLocation();
  function todoOpen() {
    setIsClicked(true);
  }
  function todoClose() {
    setIsClicked(false);
  }

 const isFirst = (pathname === "/")
  // {pathname === "/" ? ( ) : ()
  console.log(isFirst)

  const headerFromColor = `${
    isFirst
      ? "header header_blue"
      : "header"
  }`;


  return (
    <>
      {!isLogged ? (
        <header 
        // className="header" 
        className={headerFromColor}
        id="header">
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
        <header 
        className={headerFromColor}
        id="header">
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
            <div>
            <Link to="/profile" className="header__account-button">
            <img
                className="header__prof-butt-man"
                src={proflogo}
                alt="человечек"
              />
               &nbsp;Аккаунт
            </Link>
            </div>

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
