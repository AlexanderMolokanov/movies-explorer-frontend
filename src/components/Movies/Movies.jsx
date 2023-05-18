import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getAllMovies as apiGetAllMovies } from "../../utils/apii";
// import { SHORT_FILM_DURATION } from "../../utils/config";
import { filtFilms, filtDuration } from "../../utils/utils";

function Movies({ isLogged, handleLikeClick, likedFilms, onCardDelete }) {
  const [films, setFilms] = useState([]); //начальные фильмы
  const [filteredFilms, setFilteredFilms] = useState([]); //отфильтровать по запросу
  const [isErr, setIsErr] = useState(false); // вывести ошибку
  const [iSnotFound, setNotFound] = useState(false); //фильмы не найдены
  const [isSpiner, setIsSpiner] = useState(false); // включить/выключить спинер
  const [isShortFilms, setIsShortFilms] = useState(false); //чекбокс короткометражек

  //метод фильрации, отдающий массив с фильмами на рендеринг
  function handleFilterMovies(films, request, isShort) {
    const moviesList = filtFilms(films, request); //фильтруем видео по запросу
    setFilms(moviesList); //юзстейт
    setFilteredFilms(isShort ? filtDuration(moviesList) : moviesList); // проверяем чекбокс и записываем в стейт
    localStorage.setItem("films", JSON.stringify(moviesList)); // сохраняем в локал сторэдж
    localStorage.setItem("allFilms", JSON.stringify(films)); // сохраняем в локал сторэдж
  }

  // //отфильтровать видео по запросу
  // function filtFilms(films, request) {
  //   const filmsByRequest = films.filter((film) => {
  //     const filmRu = String(film.nameRU).toLowerCase().trim();
  //     const filmEn = String(film.nameEN).toLowerCase().trim();
  //     const userRequest = request.toLowerCase().trim();
  //     return (
  //       filmRu.indexOf(userRequest) !== -1 || filmEn.indexOf(userRequest) !== -1
  //     );
  //   });
  //   return filmsByRequest;
  // }

  // //отфильтровать видео по времени
  // function filtDuration(films) {
  //   return films.filter((film) => film.duration < SHORT_FILM_DURATION);
  // }

  //отфильтровать короткие видео по запросу
  function handleShortMovies() {
    setIsShortFilms(!isShortFilms);
    if (!isShortFilms) {
      if (filtDuration(films).length === 0) {
        setFilteredFilms(filtDuration(films));
      } else {
        setFilteredFilms(filtDuration(films));
      }
    } else {
      setFilteredFilms(films);
    }
    localStorage.setItem("shortFilms", !isShortFilms);
  }

  //сабмит
  function onSearchFilms(request) {
    localStorage.setItem("filmsSearch", request);
    localStorage.setItem("shortFilms", isShortFilms);

    if (localStorage.getItem("allFilms")) {
      const films = JSON.parse(localStorage.getItem("allFilms"));
      handleFilterMovies(films, request, isShortFilms);
    } else {
      setIsSpiner(true);
      apiGetAllMovies()
        .then((cardsData) => {
          handleFilterMovies(cardsData, request, isShortFilms);
          setIsErr(false);
        })
        .catch((err) => {
          setIsErr(true);
          console.log(err);
        })
        .finally(() => {
          setIsSpiner(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("shortFilms") === "true") {
      setIsShortFilms(true);
    } else {
      setIsShortFilms(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("films")) {
      const films = JSON.parse(localStorage.getItem("films"));
      setFilms(films);
      if (localStorage.getItem("shortFilms") === "true") {
        setFilteredFilms(filtDuration(films));
      } else {
        setFilteredFilms(films);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("filmsSearch")) {
      if (filteredFilms.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else {
      setNotFound(false);
    }
  }, [filteredFilms]);

  return (
    <section className="films">
      <Header isLogged={isLogged} />
      <SearchForm
        onSearchFilms={onSearchFilms}
        onFilter={handleShortMovies}
        isShortFilms={isShortFilms}
      />
      <MoviesCardList
        likedFilms={likedFilms}
        cards={filteredFilms}
        isSavedFilms={false}
        handleLikeClick={handleLikeClick}
        onCardDelete={onCardDelete}
        isErr={isErr}
        iSnotFound={iSnotFound}
        isSpiner={isSpiner}
      />
      <Footer />
    </section>
  );
}

export default Movies;
