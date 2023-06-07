import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const location = useLocation();

  function handleChangeQuery(e) {}

  function handleSubmit(e) {
    e.preventDefault();
    setIsQueryError(true);
    setIsQueryError(false);
  }

  useEffect(() => {
    location.pathname === "/movies" && localStorage.getItem("movieSearch");
  }, [location]);

  return (
    <section className="search">
      <div className="search__forms-container">
        <div className="search__form-container">
          <form className="search__form" id="form" onSubmit={handleSubmit}>
            <label className="search__label" htmlFor="search-input"></label>
            <input
              name="query"
              className="search__input"
              id="search-input"
              type="text"
              placeholder="Фильм"
              required
              onChange={handleChangeQuery}
            ></input>

            <button className="search__button" type="submit"></button>
          </form>
        </div>
        <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies} />
        {isQueryError && (
          <span className="search__form-error">
            Нужно ввести ключевое слово
          </span>
        )}
      </div>
    </section>
  );
}

export default SearchForm;
