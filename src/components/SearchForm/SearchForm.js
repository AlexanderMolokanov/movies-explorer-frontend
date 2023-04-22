import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearchMovies, onFilter, isShortMovies }) {
  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    }
  }, [location]);

  return (
    <section className="search">
      <div className="search__forms-container">
        <form
          className="search__form"
          id="form"
          // onSubmit={handleSubmit}
        >
          <label className="search__label" htmlFor="search-input"></label>
          <input
            name="query"
            className="search__input"
            id="search-input"
            type="text"
            placeholder="Фильм"
            onChange={handleChangeQuery}
            value={query || ""}
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
    </section>
  );
}

export default SearchForm;
