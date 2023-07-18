import './data.js';
import {otherUsersPhoto} from './render.js';
import './render.js';
import './commentGenerator.js';

const fullSizeView = document.querySelector('.big-picture');
const backToAllView = document.querySelector('.big-picture__cancel');
const fullViewImg = document.querySelector('.big-picture__img');
const currentViewedImage = fullViewImg.querySelector('img');
const currentLikesNumber = document.querySelector('.likes-count');
const currentCommentNumber = document.querySelector('.comments-count');
const currentPhotoCommentsNumber = document.querySelectorAll('.social__comment');
const currentPhotoCommentsList = document.querySelector('.social__comments');
const commentAvatar = currentPhotoCommentsList.querySelector('.social__picture');
const commentText = currentPhotoCommentsList.querySelector('.social__text');
const photoDescription = document.querySelector('.social__caption');
const photos = document.querySelectorAll('.picture');
const commentShowMore = document.querySelector('.social__comments-loader');
const COMMEN_LOAD_STEP = 5;

const commentsLength = document.querySelectorAll('.social__comment').length;
const arrayOfPhotoComments = Array.from(currentPhotoCommentsNumber);
// const shownArrayofComments = arrayOfPhotoComments.slice(5, currentPhotoCommentsList.length);

const shownArrayofComments = arrayOfPhotoComments.slice(0, COMMEN_LOAD_STEP);
const currentCommentShownNumber = document.querySelector('.social__comment-count');

let currentCommentsShown = 0;

arrayOfPhotoComments.forEach((el) => el.classList.add('hidden'));

for (let i = 0; i < photos.length; i++) {
  photos[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    currentCommentsShown += COMMEN_LOAD_STEP;
    fullSizeView.classList.remove('hidden');
    document.body.classList.add('modal-open');

    shownArrayofComments.forEach((el) => el.classList.remove('hidden'));

    currentViewedImage.src = otherUsersPhoto[i].url;
    currentLikesNumber.textContent = otherUsersPhoto[i].likes;
    currentCommentNumber.textContent = currentPhotoCommentsNumber.length;
    commentAvatar.src = otherUsersPhoto[i].comments.avatar;
    commentAvatar.alt = otherUsersPhoto[i].comments.name;
    commentText.textContent = otherUsersPhoto[i].comments.message;
    photoDescription.textContent = otherUsersPhoto[i].description;

    if (currentPhotoCommentsNumber.length <= COMMEN_LOAD_STEP) {
      currentCommentShownNumber.textContent = `${arrayOfPhotoComments.length} из ${arrayOfPhotoComments.length} комментариев`;
      commentShowMore.classList.add('hidden');
    }
  });
}

backToAllView.addEventListener('click' , () => {
  fullSizeView.classList.add('hidden');
  document.body.classList.remove('modal-open');
  arrayOfPhotoComments.forEach((el) => el.classList.add('hidden'));
  commentShowMore.classList.remove('hidden');
  currentCommentsShown = 0;
  currentCommentShownNumber.textContent = `${currentCommentsShown + COMMEN_LOAD_STEP} из ${arrayOfPhotoComments.length} комментариев`;
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    fullSizeView.classList.add('hidden');
    document.body.classList.remove('modal-open');
    arrayOfPhotoComments.forEach((el) => el.classList.add('hidden'));
    commentShowMore.classList.remove('hidden');
    currentCommentsShown = 0;
    currentCommentShownNumber.textContent = `${currentCommentsShown + COMMEN_LOAD_STEP} из ${arrayOfPhotoComments.length} комментариев`;
  }
});


commentShowMore.addEventListener('click', () => {
  currentCommentsShown += COMMEN_LOAD_STEP;
  // currentCommentsShown.max = arrayOfPhotoComments.length;

  const commentsShown = arrayOfPhotoComments.slice(0, currentCommentsShown);
  commentsShown.forEach((Element) => Element.classList.remove('hidden'));
  currentCommentShownNumber.textContent = `${currentCommentsShown} из ${arrayOfPhotoComments.length} комментариев`;

  if (commentsShown.length === commentsLength) {
    commentShowMore.classList.add('hidden');
  }

  if(commentShowMore.classList.contains('hidden') === true) {
    currentCommentShownNumber.textContent = `${arrayOfPhotoComments.length} из ${arrayOfPhotoComments.length} комментариев`;
  }
});
