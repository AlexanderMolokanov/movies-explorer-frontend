import { checkResponse } from "./utils";

export const BASE_URL =
  // "http://localhost:3000";
  "https://gmkvid.nomoredomains.work";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    // mode: 'no-cors', 
    credentials: "include",
    // "Access-Control-Allow-Origin": "*",
    headers: {
      // "Access-Control-Allow-Origin": "*",
      // Origin: "http://localhost:3000/",
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    // Origin: `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  }).then((res) => checkResponse(res));
};

// метод делает запрос серверу и получает данные профиля
export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  }).then((res) => checkResponse(res));
};

// изменить данные профиля на сервере
export const setUserInfo = (data) => {
  // console.log(data);
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
    body: JSON.stringify({
      name: data.name, //в name передаем значение name объекта, переданного в setUserInfo
      email: data.email, //в about передаем значение about объекта, переданного в setUserInfo
    }),
  }).then((res) => checkResponse(res));
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      // Accept: "application/json: charset=utf-8",
    },
  }).then((res) => checkResponse(res));
};

// метод добавления новой карточки на сервер
export const postCard = (data) => {
  // console.log(data);
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
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
  }).then((res) => checkResponse(res));
};

// метод удаления карточки с сервера
export const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}/movies/${cardId}`, {
    method: "DELETE",
    credentials: "include",
    "Access-Control-Allow-Origin": `${BASE_URL}`,
    headers: {
      // Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  }).then((res) => checkResponse(res));
};
