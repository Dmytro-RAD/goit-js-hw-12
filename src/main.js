import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import getImagesByQuery from './js/pixabay-api.js';

import {
  renderImages,
  initLightbox,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let currentQuery = '';
let page = 1;
let totalHits = 0;

const formElem = document.querySelector('.form');
const inputElem = document.querySelector('.input-form');
const LoadBtnElem = document.querySelector('.loadbtn');

initLightbox();

formElem.addEventListener('submit', async event => {
  event.preventDefault();
  currentQuery = inputElem.value.trim();

  if (!currentQuery) {
    iziToast.show({
      message: 'Please enter a search query!',
      color: 'yellow',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    totalHits = data.totalHits;

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

    if (totalHits > page * 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.show({
      message: `Error fetching images: ${error.message}`,
      color: 'red',
    });
  } finally {
    hideLoader();
  }
});

LoadBtnElem.addEventListener('click', async e => {
  e.preventDefault();
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    renderImages(data.hits);
    smoothScroll();

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        color: 'blue',
      });
    }
  } catch (error) {
    iziToast.show({
      message: `Error fetching images: ${error.message}`,
      color: 'red',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
