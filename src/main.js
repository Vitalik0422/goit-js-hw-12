import { getImagesByQuery as fetchImages } from './js/pixabay-api';
import {
  showLoader,
  showGallery,
  hideLoader,
  clearGallery,
  hideGallery,
  createGallery,
  waitForImages,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const searchForm = document.querySelector('.form');

const options = { maxWidth: '550px', position: 'topRight' };

const handleSubmit = e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search query is empty',
      ...options,
    });
    return;
  }
  showLoader();
  hideGallery();
  clearGallery();
  fetchImages(query)
    .then(response => {
      if (response.hits.length === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
      const result = createGallery(response.hits);
      return waitForImages(result)
        .then(() => showGallery())
        .catch(err =>
          iziToast.error({
            title: 'Error',
            message: err.message,
            ...options,
          })
        );
    })
    .catch(err =>
      iziToast.error({
        title: 'Error',
        message: err.message,
        ...options,
      })
    )
    .finally(() => {
      hideLoader();
      searchForm.reset();
    });
};
searchForm.addEventListener('submit', handleSubmit);
