import MovieService from './getFetch';
import getRefs from './get-refs';
import itemList from '../templates/btnGenre.hbs';

const API = new MovieService();
const refs = getRefs();

(async function renderMenuGenre() {
  try {
    const genre = await API.genreMovies();
    await renderGenreList(genre);
  } catch (error) {
    console.log(error);
  }
})();

async function renderGenreList({ genres }) {
  const item = genres.map(item => itemList({ item }));
  refs.genre.insertAdjacentHTML('beforeend', item.join(''));
}
