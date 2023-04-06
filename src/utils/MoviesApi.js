import { checkResponse } from './utils';

export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export function getCards() {
  console.log()
  return fetch(BASE_URL, { 
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
    },
  }).then((res) => {checkResponse(res);
    console.log(res);});
}
