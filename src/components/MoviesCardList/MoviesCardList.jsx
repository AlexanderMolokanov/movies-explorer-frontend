import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { OPEN_DESKTOP, OPEN_TABLET, OPEN_MOBILE } from "../../utils/config";

function MoviesCardList({
  cards,
  isSavedFilms,
  isSpiner,
  isErr,
  iSnotFound,
  todoLikeClick,
  likedFilms,
  onCardDelete,
}) {
  const [shownCards, setShownCards] = useState(0);
  const { pathname } = useLocation();

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1280) {
      setShownCards(12);
    } else if (display > 768) {
      setShownCards(8);
    } else if (display > 480) {
      setShownCards(5);
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
      setShownCards(shownCards + OPEN_DESKTOP);
    } else if (display > 768) {
      setShownCards(shownCards + OPEN_TABLET);
    } else if (display < 480) {
      setShownCards(shownCards + OPEN_MOBILE);
    }
  }

  function getLikedMovieCard(likedFilms, card) {
    if (likedFilms === undefined) {
      return;
    }
    return likedFilms.find((likedMovie) => likedMovie.movieId === card.id);
  }

  return (
    <section className="cards">
      {isSpiner && <Preloader />}
      {iSnotFound && !isSpiner && (
        <p className="search__error">{"Ничего не найдено"}</p>
      )}
      {isErr && !isSpiner && (
        <p className="search__error">
          {
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        </p>
      )}
      {!isSpiner && !isErr && !iSnotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films-cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getLikedMovieCard(likedFilms, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    todoLikeClick={todoLikeClick}
                    onCardDelete={onCardDelete}
                    likedFilms={likedFilms}
                  />
                ))}
              </ul>
              <div className="films-cards__button-container films-cards__button-container_pudding"></div>
            </>
          ) : (
            <>
              <ul className="films-cards__list">
                {cards.slice(0, shownCards).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getLikedMovieCard(likedFilms, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    todoLikeClick={todoLikeClick}
                    onCardDelete={onCardDelete}
                    likedFilms={likedFilms}
                  />
                ))}
              </ul>
              <div className="films-cards__button-container">
                {cards.length > shownCards ? (
                  <button className="films-cards__button" onClick={showMore}>
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
