export default class GetMovies {
  constructor() {
    this.ImgName = 35;
    this.page = 10;
    this.query = '';
    this.itemMovies = '';
    this.genres_list = [];
    this.genre_name = [];

    this.key = '0556b87ba267edab76fd3e7e8d7e5097';
    this.BASE_URL = 'https://api.themoviedb.org/3';
    this.SEARCH_URL = `${this.BASE_URL}/search/movie`;
    this.GENRE_URL = `${this.BASE_URL}/genre/movie/list`;
    this.TV_URL = `${this.BASE_URL}/genre/tv/list`;
    this.ID_URL = `${this.BASE_URL}/movie/`;
    this.TREND_URL = `${this.BASE_URL}/trending/movie/week`;
    this.IMG_URL = 'https://www.themoviedb.org/t/p/w500';
  }

  async searchMovies() {
    const response = await fetch(`${this.SEARCH_URL}?api_key=${this.key}&query=${this.query}`);
    return await response.json();
  }

  async genreMovies() {
    const response = await fetch(`${this.GENRE_URL}?api_key=${this.key}`).then(res => res.json());
    return response;
  }

  async getTrend() {
    const response = await fetch(`${this.TREND_URL}?api_key=${this.key}&page=10`);
    return await response.json();
  }
  set searchQuery(query) {
    this.query = query;
  }
  get searchQuery() {
    return this.query;
  }

  searchGenre(list) {
    const genres = list.map(item => {
      const iterableGenre = this.genres_list.find(id => id.id === item);
      this.genre_name.push(iterableGenre.name);
    });
    return genres;
  }
  genreList(query) {
    query.forEach(item => {
      this.searchGenre(item.genre_ids);
      item.genre_string = this.genre_name.slice(0, 3).join(', ');
      this.genre_name = [];
    });
  }

  nextPage() {
    this.page += 1;
  }
  previousPage() {
    this.page -= 1;
  }
  startPage() {
    this.page = 1;
  }
}
