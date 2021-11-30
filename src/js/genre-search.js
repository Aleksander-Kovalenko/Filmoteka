import MovieService from './getFetch';
import { getGenreString, getYearString } from './fetchMoviesAPI';
import renderCards from './renderCard';
import getRefs from './get-refs';

const API = new MovieService();
const refs = getRefs();

refs.genre.addEventListener('click', async e => {
  e.preventDefault();
  if (e.target.nodeName != 'BUTTON') return;

  const genreID = e.target.dataset.sources;
  const objList = await API.getTrend();
  await renderElements(objList.results, genreID);
});

async function renderElements(list, currentGenre) {
  try {
    refs.films.innerHTML = '';
    const itemList = await list.filter(i => {
      const arrID = i.genre_ids;
      const chooseGenre = arrID.find(item => item == currentGenre);
      return chooseGenre;
    });
    getYearString(itemList);
    getGenreString(itemList);
    renderCards(itemList);
  } catch (error) {
    console.log(error);
  }
}
