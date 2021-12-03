import FilmCard from '../templates/filmCard.hbs';
import getRefs from './get-refs';
import MovieService from './getFetch';

const API = new MovieService();
const refs = getRefs();

async function renderPage(card) {
  card.forEach(item => {
    if (API.ImgName <= item.poster_path.length)
      item.poster_path = `${API.IMG_URL}${item.poster_path}`;
  });

  const element = await API.genreMovies();
  API.genres_list = element.genres;
  API.genreList(card);
  creatNewGallery(card);
  convertDate(card);
}

function creatNewGallery(card) {
  refs.films.innerHTML = '';
  refs.films.insertAdjacentHTML('beforeend', FilmCard(card));
}

function convertDate(card) {
  card.forEach(item => {
    const dateYear = new Date(item.release_date).getFullYear();

    item.release_date = dateYear;
    console.log(item.release_date);
  });
  console.log(card);
}
export default renderPage;
