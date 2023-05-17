import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filtFilms, filtDuration } from "../../utils/utils";

function SavedMovies({ loggedIn, likedMovies, onCardDelete }) {
  console.log(likedMovies);
  const [filteredMovies, setFilteredMovies] = useState(likedMovies); //отфильтрованные по запросу и чекбоксу
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
    const moviesList = filtFilms(likedMovies, searchQuery);
    setFilteredMovies(isShortMovies ? filtDuration(moviesList) : moviesList);
  }, [likedMovies, isShortMovies, searchQuery]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={onSearchMovies}
        onFilter={handleShortMovies}
      />
      <MoviesCardList
        isNotFound={isNotFound}
        isSavedFilms={true}
        cards={filteredMovies}
        likedMovies={likedMovies}
        onCardDelete={onCardDelete}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
