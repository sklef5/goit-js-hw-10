import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_RESPONSE = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});
// function responseInput  (name){
export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${FILTER_RESPONSE}`).then(r => {
    if (!r.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return;
    }
    return r.json();
  });
}
