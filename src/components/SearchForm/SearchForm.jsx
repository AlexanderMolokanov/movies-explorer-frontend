import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchForm({ onSearchFilms, onFilter, isShortFilms }) {
  const [isRrequesError, setIsRrequestError] = useState(false);
  const [request, setRrequest] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("filmsSearch")
    ) {
      const localQuery = localStorage.getItem("filmsSearch");
      setRrequest(localQuery);
    }
  }, [location]);

  function todoSubmit(e) {
    e.preventDefault();
    if (request.trim().length === 0) {
      setIsRrequestError(true);
    } else {
      setIsRrequestError(false);
      onSearchFilms(request);
    }
  }

  function handleChangeRequest(e) {
    setRrequest(e.target.value);
  }

  return (
    <section className="search">
      <div className="search__forms-container">
        <div className="search__form-container">
          <form className="search__form" id="form" onSubmit={todoSubmit}>
            <label className="search__label" htmlFor="search-input"></label>
            <input
              name="request"
              className="search__input"
              id="search-input"
              type="text"
              placeholder="Фильм"
              required
              onChange={handleChangeRequest}
              value={request || ""}
            ></input>
            <button className="search__button" type="submit"></button>
          </form>
        </div>
        <form className="filter">
          <input
            className="filter__checkbox"
            type="checkbox"
            onChange={onFilter}
            checked={isShortFilms}
          ></input>
          <span className="filter__text">Короткометражки</span>
        </form>
        {isRrequesError && (
          <span className="search__form-error">
            Нужно ввести ключевое слово
          </span>
        )}
      </div>
    </section>
  );
}
