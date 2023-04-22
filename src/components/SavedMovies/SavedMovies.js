import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import { FILMS, SAVED_FILMS } from "../../utils/constants";

function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

  function onSearchMovies() {
    console.log(1);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
      />
      <ErrorBoundary>
        <MoviesCardList
          isNotFound={false}
          isSavedFilms={true}
          cards={FILMS}
          savedMovies={SAVED_FILMS}
          onCardDelete={onCardDelete}
        />
      </ErrorBoundary>
      <Footer />
    </section>
  );
}

export default SavedMovies;
