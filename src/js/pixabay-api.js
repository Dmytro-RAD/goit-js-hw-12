import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '50331031-463f70f86d851a00b481c2fad',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
  },
});

export default async function getImagesByQuery(query, page = 1) {
  try {
    const res = await instance.get('', {
      params: {
        q: query,
        page,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch images: ' + error.message);
  }
}
