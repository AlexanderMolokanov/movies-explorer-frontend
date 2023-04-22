import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import SearchError from '../SearchError/SearchError';
import { SHOW_MORE_DECKTOP, SHOW_MORE_TABLET, SHOW_MORE_MOBILE } from '../../utils/constants';

function MoviesCardList({
  cards, 
  savedMovies,
  isSavedFilms,
  isLoading,
  isReqErr,
  isNotFound,
  handleLikeClick,
  onCardDelete,
}) {
  const [shownMovies, setShownMovies] = useState(0);  
  const { pathname } = useLocation();

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(6);
    } else if (display > 1024) {
      setShownMovies(6);
    } else if (display > 800) {
      setShownMovies(6);
    } else if (display < 800) {
      setShownMovies(6);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', shownCount);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(shownMovies + SHOW_MORE_DECKTOP);
    } else if (display > 1024) {
      setShownMovies(shownMovies + SHOW_MORE_TABLET);
    }
    else if (display < 1024) {
      setShownMovies(shownMovies + SHOW_MORE_MOBILE);
    }
  }

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie._id === card.id);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          }
        />
      )} 
      {
      !isLoading && !isReqErr && !isNotFound && 
      (
        <>
          {pathname === '/saved-movies' ? (
            <>
              <ul className="movies-cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    cards={cards}
                    card={card}
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="movies-cards__button-container movies-cards__button-container_pudding"></div>
            </>
          ) : (  
            <>
              <ul className="movies-cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    cards={cards}
                    card={card}
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    isSavedFilms={isSavedFilms}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                    savedMovies={savedMovies} 
                  />
                ))}
              </ul>
              <div className="movies-cards__button-container">
                {cards.length > shownMovies ? (
                  <button className="movies-cards__button" onClick={showMore}>
                    Ещё
                  </button>
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
