import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filtFilms, filtDuration } from "../../utils/utils";

function SavedMovies({ isLogged, likedFilms, onCardDelete }) {
  // console.log(likedFilms);
  const [filteredFilms, setFilteredFilms] = useState(likedFilms); //отфильтрованные по запросу и чекбоксу
  const [isShortFilms, setIsShortFilms] = useState(false); //включен ли чекбокс короткометражек
  const [iSnotFound, setNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState("");

  function onSearchFilms(request) {
    setSearchQuery(request);
  }

  function handleShortMovies() {
    setIsShortFilms(!isShortFilms);
  }

  useEffect(() => {
    const moviesList = filtFilms(likedFilms, searchQuery);
    setFilteredFilms(isShortFilms ? filtDuration(moviesList) : moviesList);
  }, [likedFilms, isShortFilms, searchQuery]);

  useEffect(() => {
    if (filteredFilms.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredFilms]);

  return (
    <section className="films">
      <Header isLogged={isLogged} />
      <SearchForm onSearchFilms={onSearchFilms} onFilter={handleShortMovies} />
      <MoviesCardList
        iSnotFound={iSnotFound}
        isSavedFilms={true}
        cards={filteredFilms}
        likedFilms={likedFilms}
        onCardDelete={onCardDelete}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
