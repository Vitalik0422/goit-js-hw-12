import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
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
  galleryList.innerHTML = markup;
  gallery.refresh();
  return galleryList;
};

const waitForImages = container => {
  const img = [...container.querySelectorAll('img')];
  const promises = img.map(
    item =>
      new Promise(resolve => {
        if (item.complete) resolve();
        else item.addEventListener('load', resolve);
      })
  );
  return Promise.all(promises);
};

const clearGallery = () => {
  galleryList.innerHTML = '';
};
const showGallery = () => {
  galleryList.classList.add('isActiveGallery');
};
const hideGallery = () => {
  galleryList.classList.remove('isActiveGallery');
};
const showLoader = () => {
  loader.classList.add('isActive');
};
const hideLoader = () => {
  loader.classList.remove('isActive');
};

export {
  createGallery,
  clearGallery,
  showGallery,
  hideGallery,
  showLoader,
  hideLoader,
  waitForImages,
};
