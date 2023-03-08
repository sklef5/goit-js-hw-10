import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER_RESPONSE = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${FILTER_RESPONSE}`).then(r => {
    if (!r.ok){
      throw new Error(r.status)
    }
    return r.json();
  });
}
