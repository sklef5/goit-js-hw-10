import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let listOfCountries = '';
let aboutCountry = '';

const inputForm = document.querySelector('#search-box');
const countryBlockList = document.querySelector('.country-list');
const countryBlock = document.querySelector('.country-info');

function addCountryList(countrylist) {
  listOfCountries = countrylist
    .map(
      country =>
        `<li><img src=${country.flags.svg} alt=${country.name.official} width=20 /> <span>${country.name.official}</span></li>`
    )
    .join('');
  countryBlockList.insertAdjacentHTML('afterbegin', listOfCountries);
}

function addCountryDetails(countrylist) {
  aboutCountry = countrylist
    .map(
      country => `<p><img src=${country.flags.svg} alt=${
        country.name.official
      } width=25 /> <span style="font-size:25px">${
        country.name.official
      }</span></p>
                                                <p><b>Capital:</b> ${
                                                  country.capital
                                                }</p>
                                                <p><b>Population:</b> ${
                                                  country.population
                                                }</p>
                                                <p><b>Languages: </b>${Object.values(
                                                  country.languages
                                                )}</p>
    `
    )
    .join('');
  countryBlock.insertAdjacentHTML('afterbegin', aboutCountry);
}

function inputCity(e) {
  const formdata = e.target.value.trim();
  countryBlock.innerHTML = '';
  countryBlockList.innerHTML = '';
  if (!formdata) {
    return;
  }
  fetchCountries(formdata)
    .then(countryData => {
      if (countryData.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countryData.length >= 2 && countryData.length <= 10) {
        addCountryList(countryData);
        return;
      }
      if (countryData.length < 2) {
        addCountryDetails(countryData);
        return;
      }
    })
    .catch(()=>{
      Notiflix.Notify.failure('Oops, there is no country with that name');
    })
    }

inputForm.addEventListener('input', debounce(inputCity, DEBOUNCE_DELAY));
