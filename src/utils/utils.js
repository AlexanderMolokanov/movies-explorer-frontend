import { SHORT_FILM_DURATION } from "./config";

//отфильтровать видео по запросу
function filtFilms(films, request) {
  const filmsByRequest = films.filter((film) => {
    const filmRu = String(film.nameRU).toLowerCase().trim();
    const filmEn = String(film.nameEN).toLowerCase().trim();
    const userRequest = request.toLowerCase().trim();
    return (
      filmRu.indexOf(userRequest) !== -1 || filmEn.indexOf(userRequest) !== -1
    );
  });
  return filmsByRequest;
}

//отфильтровать видео по времени
function filtDuration(films) {
  return films.filter((film) => film.duration < SHORT_FILM_DURATION);
}

//изменить формат времени фильмов


export { filtDuration, filtFilms };
