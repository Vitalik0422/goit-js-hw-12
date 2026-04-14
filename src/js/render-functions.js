import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

const gallery = new SimpleLightbox('.gallery a');

const createGallery = images => {
  const markup = images
    .map(
      item => `<li class="galleryItem">
        <a href="${item.largeImageURL}">
          <img src="${item.webformatURL}" alt="${item.tags}" />
          <ul class="informationList">
            <li class="informationItem">Likes <span class="infoAmount">${item.likes}</span></li>
            <li class="informationItem">Views <span class="infoAmount">${item.views}</span></li>
            <li class="informationItem">Comments <span class="infoAmount">${item.comments}</span></li>
            <li class="informationItem">Downloads <span class="infoAmount">${item.downloads}</span></li>
          </ul>
        </a>
      </li>`
    )
    .join('');
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
  const items = [...refs.galleryList.querySelectorAll('.galleryItem')].slice(
    -images.length
  );
  return items;
};

const waitForImages = async container => {
  const allImg = container.map(item => item.querySelector('img'));
  await Promise.all(
    allImg.map(
      item =>
        new Promise(resolve => {
          if (item.complete) resolve();
          item.addEventListener('load', resolve);
          item.addEventListener('error', resolve);
        })
    )
  );
};

const clearGallery = () => {
  refs.galleryList.innerHTML = '';
};
const showLoader = () => {
  refs.loader.classList.add('isActive');
};
const hideLoader = () => {
  refs.loader.classList.remove('isActive');
};
const showLoadMoreButton = () => {
  refs.loadMoreBtn.classList.add('isActive');
};
const hideLoadMoreButton = () => {
  refs.loadMoreBtn.classList.remove('isActive');
};

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  waitForImages,
  showLoadMoreButton,
  hideLoadMoreButton,
};
