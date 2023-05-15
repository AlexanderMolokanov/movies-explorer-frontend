import { SHORT_FILM_DURATION } from './constants'; 

export const resHandler = (res) => {
  if (res.ok) {
    return res.json(); //если да, то возвращает полученные данные
  }
  return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
};

//фильтр по запросу
export function filterMovies(movies, query) {
  // console.log('filterMovies(movies, query)', movies, query)
  const moviesByQuery = movies.filter((movie) => { 
  // const moviesByQuery = Object.values(movies).filter((movie) => { 
    
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = query.toLowerCase().trim();
    return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
  }); 
  return moviesByQuery;
}

//фильтр по длительности
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration < SHORT_FILM_DURATION);
}

//конвертер длительности фильмов
export function durationConverter(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  // return `${hours}ч${minutes}м`;
  if (hours > 0) {
    return `${hours}ч${minutes}м`;
  } else {
    return `${minutes}м`;
  }
}
