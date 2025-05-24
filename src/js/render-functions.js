import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElem = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
        width="360"
        height="200"
      />
    </a>
    <div class="info">
  <div class="info-item">
    <p class="text-info">Likes</p>
    <p class="value-info">${likes}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Views</p>
    <p class="value-info">${views}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Comments</p>
    <p class="value-info">${comments}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Downloads</p>
    <p class="value-info">${downloads}</p>
  </div>
</div>

  </li>`;
}

let lightbox;

export function initLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function imagesGallery(images) {
  return images.map(createGallery).join('');
}

export function renderImages(images) {
  showLoader();

  try {
    const markup = imagesGallery(images);
    galleryElem.innerHTML = markup;
    refreshLightbox();
  } finally {
    hideLoader();
  }
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryElem.innerHTML = '';
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}
