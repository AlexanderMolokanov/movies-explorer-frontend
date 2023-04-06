import { checkResponse } from './utils';

export const BASE_URL = 
'https://api.nomoreparties.co/beatfilm-movies'
// 'http://localhost:3000'

;

export function getCards() {
  console.log()
  return fetch(BASE_URL, { 
    method: 'GET',
    credentials: 'include',
    headers: {
      Origin: `${BASE_URL}`,
      "Content-Type": "application/json",
        Accept: "application/json: charset=utf-8",
    },
  }).then((res) => {checkResponse(res);
    console.log(res);});
}
