import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Footer from '../Footer/Footer';
import { filterMovies, filterDuration } from '../../utils/utils';
import { FILMS, SAVED_FILMS } from '../../utils/constants';

function SavedMovies({ 
  loggedIn, 
  savedMovies, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
  const [searchQuery, setSearchQuery] = useState('');

  // const loggedIn = true; 

  //submit
  function onSearchMovies(query) {
    setSearchQuery(query);
  }

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  // useEffect(() => {
  //   const moviesList = filterMovies(savedMovies, searchQuery);
  //   setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
  // }, [savedMovies, isShortMovies, searchQuery]);

  // useEffect(() => {
  //   if (filteredMovies.length === 0) {
  //     setIsNotFound(true);
  //   } else {
  //     setIsNotFound(false);
  //   }
  // }, [filteredMovies]);

  return (
    <section className="movies">
      <Header loggedIn={!loggedIn} />
      <SearchForm 
      onSearchMovies={onSearchMovies} 
      onFilter={handleShortMovies} />
      <ErrorBoundary>
        <MoviesCardList
        // isNotFound={isNotFound}
        isNotFound={false}
        isSavedFilms={true} 
        // cards={filteredMovies}
        cards={FILMS}
        // savedMovies={savedMovies}
        savedMovies={SAVED_FILMS}
        onCardDelete={onCardDelete}
        />
      </ErrorBoundary>
      <Footer />
    </section>
  );
}

export default SavedMovies;
