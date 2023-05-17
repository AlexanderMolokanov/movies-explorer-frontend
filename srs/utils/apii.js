import { resHandler } from "./utils";

const BASE_URL = 
"http://localhost:3000";
// "https://gmkvid.nomoredomains.work";

const BASE_ALL_FILMS_URL = "https://api.nomoreparties.co/beatfilm-movies";

// добавить карточку на сервер
const saveCard = (data) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: "https://api.nomoreparties.co" + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail:
        "https://api.nomoreparties.co" + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then((res) => resHandler(res));
};

// изменить данные профиля
const setUser = (data) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => resHandler(res));
};

// регистрация
const signup = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => resHandler(res));
};

// авторизация
const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => resHandler(res));
};

// удалить карточку с сервера
const deleteSavedCard = (moviId) => {
  return fetch(`${BASE_URL}/movies/${moviId}`, {
    method: "DELETE",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  }).then((res) => resHandler(res));
};

// получить все фильмы
function getAllMovies() {
  return fetch(BASE_ALL_FILMS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => resHandler(res));
}

// получить сохраненные фильмы
const getSavedCards = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => resHandler(res));
};

// получить данные пользователя
const getUser = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  }).then((res) => resHandler(res));
};

export {
  saveCard,
  setUser,
  signup,
  signin,
  deleteSavedCard,
  getAllMovies,
  getSavedCards,
  getUser,
};
