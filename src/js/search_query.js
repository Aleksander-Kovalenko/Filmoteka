import MovieService from './getFetch';
import getRefs from './get-refs';
import renderCards from './renderCard';

import { getGenreString, getYearString } from './fetchMoviesAPI';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const { error, info, notice } = require('@pnotify/core');

const API = new MovieService();
const refs = getRefs();

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const value = e.currentTarget.elements.query.value.trim();
  if (!value) return onEmptySearch();

  creatRequest(value);
});

async function creatRequest(value) {
  API.searchQuery = value;
  try {
    const getFilmList = await API.searchMovies();
    if (getFilmList.results.length === 0) return onInfo();
    getYearString(getFilmList.results);
    getGenreString(getFilmList.results);
    renderCards(getFilmList.results);
    refs.form.reset();
  } catch (error) {
    onError();
  }
}

function onError() {
  return error({
    text: 'Search result not successful. Enter the correct movie name!',
    type: 'Error',
    delay: 2000,
  });
}
function onInfo() {
  return info({
    text: 'Sorry, but no such movie was found.',
    type: 'info',
    delay: 2000,
  });
}
function onEmptySearch() {
  return notice({
    text: 'What do you want to watch?',
    type: 'info',
    delay: 2000,
  });
}

