import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectors = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};
selectors.error.style.display = 'none';
selectors.select.style.display = 'none';

fetchBreeds()
  .then(data => {
    selectors.select.style.display = '';
    selectors.select.insertAdjacentHTML('beforeend', markupOption(data));
    selectors.loader.style.display = 'none';
  })
  .catch(error => {
    console.log(error);
    selectors.error.style.display = '';
    selectors.loader.style.display = 'none';
  });

function markupOption(arr) {
  return arr
    .map(({ name, id }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function markupData(obj) {
  const { url } = obj;
  const { name, description, temperament } = obj.breeds[0];
  return `<div>
  <img src="${url}" height="480" />
  <h2>${name}</h2>
  <p>${description}</p>
  <p><span>Temperament:</span> ${temperament}</p>
  </div>`;
}

selectors.select.addEventListener('change', handleSelect);

function handleSelect(event) {
  selectors.loader.style.display = '';
  selectors.container.style.display = 'none';
  fetchCatByBreed(event.target.value)
    .then(data => {
      selectors.container.style.display = '';
      selectors.loader.style.display = 'none';
      selectors.container.innerHTML = markupData(...data);
    })
    .catch(error => {
      console.log(error);
      selectors.error.style.display = '';
      selectors.loader.style.display = 'none';
      selectors.container.style.display = 'none';
    });
}
