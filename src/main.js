import { getImagesByQuery as fetchImages } from './js/pixabay-api';
import { refs } from './js/refs';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  waitForImages,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const options = { maxWidth: '550px', position: 'topRight' };
const fetchParams = {
  page: 1,
  totalPage: 1,
  query: '',
};

const calcPages = value => {
  fetchParams.totalPage = Math.ceil(value / 15);
};

const fetchData = async ({ query, page }) => {
  try {
    hideLoadMoreButton();
    showLoader();
    const resData = await fetchImages(query, page);
    if (resData.hits.length === 0)
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    calcPages(resData.totalHits);
    const newItem = await createGallery(resData.hits);
    await waitForImages(newItem);
    newItem.forEach(item => item.classList.add('isActive'));
    hideLoader();
    if (fetchParams.page >= fetchParams.totalPage) {
      throw new Error(
        'We`re sorry, but you`ve reached the end of search results.'
      );
    }
    showLoadMoreButton();
  } catch (error) {
    console.dir(error);
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message, ...options });
  }
};

const handleSubmit = async e => {
  try {
    e.preventDefault();
    const q = e.target.elements['search-text'].value.trim();
    if (q === '') {
      throw new Error('Search query is empty');
    }
    fetchParams.query = q;
    fetchParams.page = 1;
    clearGallery();
    await fetchData(fetchParams);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, ...options });
  }
};

const handleClick = async () => {
  try {
    fetchParams.page += 1;
    await fetchData(fetchParams);
    const cardHeight = document
      .querySelector('.galleryItem')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoadMoreButton();
    iziToast.error({ title: 'Error', message: error.message, ...options });
  }
};
refs.searchForm.addEventListener('submit', handleSubmit);
refs.loadMoreBtn.addEventListener('click', handleClick);
