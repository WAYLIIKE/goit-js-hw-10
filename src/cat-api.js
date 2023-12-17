import axios from 'axios';
export { fetchBreeds, fetchCatByBreed };
axios.defaults.headers.common['x-api-key'] =
  'live_Ogp8p5DpBvSk4Pmi0DsyqYKjsTgpuwjP5ZR5cGqitWuyatI1byRKqnpmjTBbwk0N';

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/';
  const END_POINT = 'v1/breeds';
  return axios
    .get(`${BASE_URL}${END_POINT}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/';
  const END_POINT = 'v1/images/search';
  const queryParams = new URLSearchParams({ breed_ids: breedId });
  return new axios.get(`${BASE_URL}${END_POINT}?${queryParams}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}
