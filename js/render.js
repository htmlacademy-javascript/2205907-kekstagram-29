import './data.js';
import './util.js';
import {createPhotosData} from './data.js';


const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const otherUsersPhoto = createPhotosData();

const photoListFragment = document.createDocumentFragment();

otherUsersPhoto.forEach((photo) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.message;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  photoListFragment.appendChild(photoElement);
});

photoList.appendChild(photoListFragment);

export {otherUsersPhoto};
