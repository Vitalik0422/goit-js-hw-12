import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '55362008-0a0d101fe7347dac3fa7e75ec',
    safesearch: true,
  },
});
export const getImagesByQuery = async (query, page) => {
  const response = await instance.get('', {
    params: {
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '15',
      page: page,
    },
  });
  return response.data;
};
