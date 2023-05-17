import { SHORT_FILM_DURATION } from "./config";

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

//изменить формат времени фильмов


export { filtDuration, filtFilms };
