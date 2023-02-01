import axios from 'axios'

export default class PhotoAPI {
  
  static USER_KEY = '33137709-f2e91a4e178fe6649a67a49d0';
  static BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.page = null;
    this.query = null;
    this.per_page = 15;
  }

  fetchQuery() {
    const searchOptions = {
      params: {
        key: PhotoAPI.USER_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page
      }
    }

    return axios.get(`${PhotoAPI.BASE_URL}`, searchOptions)
  }
}

