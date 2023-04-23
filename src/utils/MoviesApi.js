import { checkResponse } from './utils';

export const BASE_URL = 
'https://api.nomoreparties.co/beatfilm-movies'
;

export function getCards() { 
  return fetch(BASE_URL, { 
    // mode: 'no-cors',
    method: 'GET',
    // credentials: 'include',
    // 'Access-Control-Allow-Origin': `${BASE_URL}`,
    // 'Access-Control-Allow-Origin': `true`,
    // 'Access-Control-Allow-Origin': "null",
    headers: {
      // Origin: `${BASE_URL}`,
      // 'Access-Control-Allow-Origin': `${BASE_URL}`,
      "Content-Type": "application/json",
        // Accept: "application/json: charset=utf-8",
    },
  }).then((res) => {
    checkResponse(res);
  });
}
