import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import SearchError from "../SearchError/SearchError";
import {
  OPEN_DESKTOP,
  OPEN_TABLET,
  OPEN_MOBILE,
} from "../../utils/config";

function MoviesCardList({
  cards,  
  isSavedFilms,
  isSpiner,
  isReqErr,
  isNotFound,
  handleLikeClick,
  likedMovies,
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
      setShownMovies(  + OPEN_DESKTOP);
    } else if (display > 768) {
      setShownMovies(shownMovies + OPEN_TABLET);
    } else if (display < 480) {
      setShownMovies(shownMovies + OPEN_MOBILE);
    }
  }

  function getLikedMovieCard(likedMovies, card) {
    if (likedMovies === undefined) {
      return;
    }
    return likedMovies.find((likedMovie) => likedMovie.movieId === card.id);
  }

  return (
    <section className="cards">
      {isSpiner && <Preloader />}
      {isNotFound && !isSpiner && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqErr && !isSpiner && (
        <SearchError
          errorText={
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isSpiner && !isReqErr && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="movies-cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getLikedMovieCard(likedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                    likedMovies={likedMovies}
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
                    saved={getLikedMovieCard(likedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeClick={handleLikeClick}
                    onCardDelete={onCardDelete}
                    likedMovies={likedMovies}
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
