import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';

import {
  createGallery,
  imagesGallery,
  renderImages,
  initLightbox,
  refreshLightbox,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

//===================================================================//
const formElem = document.querySelector('.form');
const inputElem = document.querySelector('.input-form');

initLightbox();

formElem.addEventListener('submit', event => {
  event.preventDefault();

  const query = inputElem.value.trim();

  if (!query) {
    iziToast.show({
      message: 'Please enter a search query!',
      color: 'yellow',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          imageWidth: 24,
        });
        return;
      }

      renderImages(data.hits);
    })
    .catch(error => {
      iziToast.show({
        message: `Error fetching images: ${error.message}`,
        color: 'red',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
