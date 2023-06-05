import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filtFilms, filtDuration } from "../../utils/someFunctionality";

export default function SavedMovies({ isLogged, likedFilms, onCardDelete }) {
  const [filteredFilms, setFilteredFilms] = useState(likedFilms); //отфильтрованные по запросу и чекбоксу
  const [isShortFilms, setIsShortFilms] = useState(false); //включен ли чекбокс короткометражек
  const [iSnotFound, setNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearcRequest] = useState("");

  useEffect(() => {
    const filmsList = filtFilms(likedFilms, searchQuery);
    setFilteredFilms(isShortFilms ? filtDuration(filmsList) : filmsList);
  }, [likedFilms, isShortFilms, searchQuery]);

  useEffect(() => {
    if (filteredFilms.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [filteredFilms]);

  function findShortFilms() {
    setIsShortFilms(!isShortFilms);
  }

  function onSearchFilms(request) {
    setSearcRequest(request);
  }

  return (
    <section className="films">
      <Header isLogged={isLogged} />
      <SearchForm onSearchFilms={onSearchFilms} onFilter={findShortFilms} />
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
