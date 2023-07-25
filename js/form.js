const imgUpload = document.querySelector('#upload-file');
const uploadModal = document.querySelector('.img-upload__overlay');
const imgPreview = document.querySelector('.img-upload__preview');
const closeUploadForm = document.querySelector('#upload-cancel');
const hashtagWrapper = document.querySelector('.hashtag__field-wrapper');
const hashtagInput = hashtagWrapper.querySelector('input');
const commentWrapper = document.querySelector('.comment-text__field-wrapper');
const commentInput = commentWrapper.querySelector('textarea');
const uploadPhotoForm = document.querySelector('.img-upload__form');
const hashTagText = uploadPhotoForm.querySelector('.text__hashtags');
const postPhotoButton = document.querySelector('.img-upload__submit');
const commentTextArea = document.querySelector('.text__description');

const HASTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const COMMENT_LENGTH = 140;
const HASHTAG_LENGTH = 19;
const HASHTAG_NUMBER_ALLOWED = 5;

imgUpload.addEventListener('change', (evt) => {
  evt.preventDefault();

  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgPreview.querySelector('img').src = imgUpload.src;
});

closeUploadForm.addEventListener('click' , () => {
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  if (evt.keyCode === 27) {
    uploadModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

document.addEventListener('keydown', (evt) => {
  evt.preventDefault();

  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

hashtagInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

commentInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});


//--------
const pristine = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__text', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__text--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__text--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__form__error' // Класс для элемента с текстом ошибки
});

function validateComment (value) {
  return value.length <= COMMENT_LENGTH;
}

pristine.addValidator(
  uploadPhotoForm.querySelector('.text__description'),
  validateComment,
  `Максимальная длина ${COMMENT_LENGTH} символов`
);

//--------------------------------------------------------------
function validateTagHead (value) {
  const hashtags = value.split(' ');

  if (value === '') {
    return true;
  }
  return hashtags.every((hashtag) => HASTAG_REGEX.test(hashtag));
}

pristine.addValidator(
  hashTagText,
  validateTagHead,
  'Хештэги должны начинаться с # и не содержать спец. символов'
);

function validateTagLength (value) {
  const hashtags = value.split(' ');

  return hashtags.every((hashtag) => hashtag.length <= HASHTAG_LENGTH);
}

pristine.addValidator(
  hashTagText,
  validateTagLength,
  'Длина одного хештэга не может быть больше 20 символов, с учетом #'
);

function validateTagUnique (value) {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
}

pristine.addValidator(
  hashTagText,
  validateTagUnique,
  'Хештэги не должны повторяться'
);

function validateTagsNumber (value) {
  const splitedTags = value.split(' ');
  return splitedTags.length <= HASHTAG_NUMBER_ALLOWED;
}

pristine.addValidator(
  hashTagText,
  validateTagsNumber,
  `Кол-во тегов не может быть больше ${HASHTAG_NUMBER_ALLOWED}`
);

postPhotoButton.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate(hashTagText) && pristine.validate(commentTextArea)) {
    return true;
  }
});

const LoadedImgPreview = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
    //отобразим картинку
    const changeImg = document.querySelector('.img-upload__overlay');
    changeImg.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const image = document.querySelector('.img-upload__preview img');
    image.src = URL.createObjectURL(file.files[0]);
    const effectImgs = document.querySelectorAll('.effects__preview');
    effectImgs.forEach((img) => {
      img.style.backgroundImage = `url(${image.src})`;
    });
  });
};

export { LoadedImgPreview };
