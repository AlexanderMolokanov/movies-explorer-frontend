import React from 'react';
import { durationConverter } from '../../utils/utils';
import './MoviesCard.css';

function MoviesCard({ card, isSavedFilms, handleLikeClick, onCardDelete, saved, savedMovies }) {
  function onCardClick() {
    if (saved) {
      onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      handleLikeClick(card);
    }
  }

  function onDelete() {
    onCardDelete(card);
  }

  const cardSaveButtonClassName = `${
    saved ? 'movies-card__save-button movies-card__save-button_active' : 'movies-card__save-button'
  }`;

  return (
    <li className="card">
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          alt={card.nameRU}
          src={isSavedFilms ? card.image : 
            // `https://api.nomoreparties.co/${card.image.url}`
            `http://localhost:3000/${card.image.url}`
          }
        />
      </a>

      <div className="movies-card__container">
        <div className="movies-card__info-container">
          <h2 className="movies-card__text">{card.nameRU}</h2>
          <span className="movies-card__time">{durationConverter(card.duration)}</span>
        </div>
        {isSavedFilms ? (
          <button type="button" className="movies-card__del-button" onClick={onDelete}></button>
        ) : (
          <button type="button" className={cardSaveButtonClassName} onClick={onCardClick}></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
