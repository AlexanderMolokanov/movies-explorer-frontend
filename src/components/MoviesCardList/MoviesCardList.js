import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";
import {
  SHOW_MORE_DECKTOP,
  SHOW_MORE_TABLET,
  SHOW_MORE_MOBILE,
} from "../../utils/constants";

function MoviesCardList({
  cards,
  isSavedFilms,
  isLoading,
  isReqErr,
  isNotFound,
  handleLikeClick,
  savedMovies,
  onCardDelete,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1280) {
      setShownMovies(12);
    } else if (display > 768) {
      setShownMovies(8);
    } else if (display > 480) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownCount);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1280) {
      setShownMovies(shownMovies + SHOW_MORE_DECKTOP);
    } else if (display > 768) {
      setShownMovies(shownMovies + SHOW_MORE_TABLET);
    } else if (display < 480) {
      setShownMovies(shownMovies + SHOW_MORE_MOBILE);
    }
  }

  function getSavedMovieCard(savedMovies, card) {
    if (savedMovies === undefined) {
      return;
    }
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqErr && !isLoading && (
        <SearchError
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqErr && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="movies-cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    cards={cards}
                    card={card}
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
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovieCard(savedMovies, card)}
                    cards={cards}
                    card={card}
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
                  ""
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
