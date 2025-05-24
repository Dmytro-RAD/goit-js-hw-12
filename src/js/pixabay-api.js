import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '50331031-463f70f86d851a00b481c2fad',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

export default function getImagesByQuery(query) {
  return instance
    .get('', {
      params: { q: query },
    })
    .then(res => res.data);
}
