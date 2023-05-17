import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getAllMovies as apiGetAllMovies } from "../../utils/apii";
import { SHORT_FILM_DURATION } from "../../utils/config";

function Movies({ loggedIn, handleLikeClick, likedMovies, onCardDelete }) {
  const [isSpiner, setIsSpiner] = useState(false);  
  const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
  const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
  const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
  const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены

  //основнай метод фильрации, который отдает массив с фильмами на рендеринг
  function handleFilterMovies(movies, query, short) {
    const moviesList = filtFilms(movies, query); //фильтруем полученный массив по запросу
    setInitialMovies(moviesList); //записываем в стейт
    setFilteredMovies(short ? filtDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
    localStorage.setItem("movies", JSON.stringify(moviesList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  //отфильтровать видео по запросу
  function filtFilms(films, query) {
    const moviesByQuery = films.filter((film) => {
      const movieRu = String(film.nameRU).toLowerCase().trim();
      const movieEn = String(film.nameEN).toLowerCase().trim();
      const userQuery = query.toLowerCase().trim();
      return (
        movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
      );
    });
    return moviesByQuery;
  }

  //отфильтровать видео по времени
  function filtDuration(films) {
    return films.filter((film) => film.duration < SHORT_FILM_DURATION);
  }

  //фильтруем короткие видео по запросу
  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
    if (!isShortMovies) {
      if (filtDuration(initialMovies).length === 0) {
        setFilteredMovies(filtDuration(initialMovies));
      } else {
        setFilteredMovies(filtDuration(initialMovies));
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !isShortMovies);
  }

  //submit
  function onSearchMovies(query) {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("shortMovies", isShortMovies);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilterMovies(movies, query, isShortMovies);
    } else {
      setIsSpiner(true);
      apiGetAllMovies()
        .then((cardsData) => {
          handleFilterMovies(cardsData, query, isShortMovies);
          setIsReqErr(false);
        })
        .catch((err) => {
          setIsReqErr(true);
          console.log(err);
        })
        .finally(() => {
          setIsSpiner(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setIsShortMovies(true);
    } else {
      setIsShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filtDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
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
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        likedMovies={likedMovies}
        cards={filteredMovies}
        isSavedFilms={false}
        handleLikeClick={handleLikeClick}
        onCardDelete={onCardDelete}
        isReqErr={isReqErr}
        isNotFound={isNotFound}
        isSpiner={isSpiner}
      />
      <Footer />
    </section>
  );
}

export default Movies;
