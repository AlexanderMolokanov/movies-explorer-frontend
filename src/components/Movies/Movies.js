import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filterMovies, filterDuration } from "../../utils/utils";
import { FILMS, SAVED_FILMS } from "../../utils/constants";

import * as movies from "../../utils/MoviesApi";

function Movies({ loggedIn, handleLikeClick, savedMovies, onCardDelete }) {
  loggedIn = true;
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);

  function handleFilterMovies(movies, query, short) {
    const moviesList = filterMovies(movies, query, short);
    setInitialMovies(moviesList);
    setFilteredMovies(short ? filterDuration(moviesList) : moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", FILMS);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filterDuration(initialMovies).length === 0) {
        setFilteredMovies(filterDuration(initialMovies));
      } else {
        setFilteredMovies(filterDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  function onSearchMovies(query) {
    console.log(query);
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
    }
  }, []);


  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        cards={FILMS}
        savedMovies={SAVED_FILMS}
        isSavedFilms={false}
        handleLikeClick={handleLikeClick}
        onCardDelete={onCardDelete}
        isLoading={false}
        isReqErr={false}
        isNotFound={false}
      />
      <Footer />
    </section>
  );
}

export default Movies;
