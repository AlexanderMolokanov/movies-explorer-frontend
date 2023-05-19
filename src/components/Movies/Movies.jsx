import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { getAllFilms as apiGetAllFilms } from "../../utils/apii";
import { filtFilms, filtDuration } from "../../utils/someFunctionality";

function Movies({ isLogged, todoLikeClick, likedFilms, onCardDelete }) {
  const [films, setFilms] = useState([]); //начальные фильмы
  const [filteredFilms, setFilteredFilms] = useState([]); //отфильтровать по запросу
  const [isErr, setIsErr] = useState(false); // вывести ошибку
  const [iSnotFound, setNotFound] = useState(false); //фильмы не найдены
  const [isSpiner, setIsSpiner] = useState(false); // включить/выключить спинер
  const [isShortFilms, setIsShortFilms] = useState(false); //чекбокс короткометражек

  //фильтруем фильмы и кладем в локал сторэдж 
  function filterFilms(films, request, isShort) {
    const filmsList = filtFilms(films, request); // получаем фильмы по запросу
    setFilms(filmsList); //юзстейт
    setFilteredFilms(isShort ? filtDuration(filmsList) : filmsList); // проверяем чекбокс и записываем их в стейт
    localStorage.setItem("films", JSON.stringify(filmsList)); // сохраняем в локал сторэдж
    localStorage.setItem("allFilms", JSON.stringify(films)); // сохраняем в локал сторэдж
  }

  //отфильтровать короткие видео по запросу
  function findShortFilms() {
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
      filterFilms(films, request, isShortFilms);
    } else {
      setIsSpiner(true);
      apiGetAllFilms()
        .then((cardsData) => {
          filterFilms(cardsData, request, isShortFilms);
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
        onFilter={findShortFilms}
        isShortFilms={isShortFilms}
      />
      <MoviesCardList
        likedFilms={likedFilms}
        cards={filteredFilms}
        isSavedFilms={false}
        todoLikeClick={todoLikeClick}
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
