import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Footer from "../Footer/Footer";
import { filterMovies, filterDuration } from "../../utils/utils";

function SavedMovies({ loggedIn, savedMovies, onCardDelete }) {
  console.log(savedMovies)
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState("");

  //submit
  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  useEffect(() => {
    const moviesList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  }, [savedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  // useEffect(() => {
  //   if (localStorage.getItem("movieSearch")) {
  //     if (filteredMovies.length === 0) {
  //       setIsNotFound(true);
  //     } else {
  //       setIsNotFound(false);
  //     }
  //   } else {
  //     setIsNotFound(false);
  //   }
  // }, [filteredMovies]);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
        // isShortMovies={isShortMovies}
      /> 
      {/* <ErrorBoundary> */}
        <MoviesCardList
          isNotFound={isNotFound}
          isSavedFilms={true}
          cards={filteredMovies}
          savedMovies={savedMovies}
          onCardDelete={onCardDelete}  
          // savedMovies={SAVED_FILMS}
          // isNotFound={false}
          // cards={FILMS}
        />
      {/* </ErrorBoundary> */}
      <Footer />
    </section>
  );
}

export default SavedMovies;
