import React from "react";
// import { changeTimeTormat } from "../../utils/utils";
import "./MoviesCard.css";

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeClick,
  onCardDelete,
  saved,
  likedMovies,
}) {
  function onCardClick() {
    if (saved) {
      onCardDelete(likedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      handleLikeClick(card);
    }
  }

  //изменить формат времени фильмов
  function changeTimeTormat(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours > 0) {
      return `${hours}ч${minutes}м`;
    } else {
      return `${minutes}м`;
    }
  }

  function onDelete() {
    onCardDelete(card);
  }

  const cardSaveButtonClassName = `${
    saved
      ? "films-card__save-button films-card__save-button_active"
      : "films-card__save-button"
  }`;

  return (
    <li className="card">
      <div className="films-card__container">
        <div className="films-card__info-container">
          <h2 className="films-card__text">{card.nameRU}</h2>
          <span className="films-card__time">
            {changeTimeTormat(card.duration)}
          </span>
        </div>
        {isSavedFilms ? (
          <button
            type="button"
            className="films-card__del-button"
            onClick={onDelete}
          ></button>
        ) : (
          <button
            type="button"
            className={cardSaveButtonClassName}
            onClick={onCardClick}
          ></button>
        )}
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="films-card__image"
          alt={card.nameRU}
          src={
            isSavedFilms
              ? card.image
              : `https://api.nomoreparties.co${card.image.url}`
          }
        />
      </a>
    </li>
  );
}

export default MoviesCard;
