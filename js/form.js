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
const submitButton = document.querySelector('.img-upload__submit');

const COMMENT_LENGTH = 140;
const HASHTAG_LENGTH = 19;
const COMMENT_NUMBER_ALLOWED = 5;

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


//Валидация комментария
const pristineComment = new Pristine(uploadPhotoForm, {
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

pristineComment.addValidator(
  uploadPhotoForm.querySelector('.text__description'),
  validateComment,
  `Максимальная длина ${COMMENT_LENGTH} символов`
);

submitButton.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineComment.validate();
});

const pristineTag = new Pristine(uploadPhotoForm, {
  classTo: 'img-upload__field-wrapper', // Элемент, на который будут добавляться классы
  errorClass: 'img-upload__field-wrapper--invalid', // Класс, обозначающий невалидное поле
  successClass: 'img-upload__field-wrapper--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'img-upload__field-wrapper__text', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'img-upload__form__error' // Класс для элемента с текстом ошибки
});

function validateTagHead (value) {
  const splitedTags = value.split(' ');

  for(let i = 0; i < splitedTags.length; i++) {
    if (splitedTags[i].startsWith('#', splitedTags)) {
      return true;
    }
    return false;
  }
}

pristineComment.addValidator(
  hashTagText,
  validateTagHead,
  'Хештэг должен начинаться с #'
);

function validateTagLength (value) {
  const splitedTags = value.split(' #');

  if (splitedTags.length === 1) {
    return splitedTags[0].length <= HASHTAG_LENGTH;
  } else {
    for (let i = 0; i < splitedTags.length; i++) {
      if (splitedTags[i].length > HASHTAG_LENGTH) {
        return false;
      }
      return true;
    }
  }
}

pristineComment.addValidator(
  hashTagText,
  validateTagLength,
  'Длина одного хештэга не может быть больше 20 символов, с учетом #'
);

function validateTagContent (value) {
  const trimmedSymbols = value.trim();
  const splitedSymbols = trimmedSymbols.split();

  if (splitedSymbols.includes('$')) {
    return false;
  } else if(splitedSymbols.includes('@')) {
    return false;
  }

  for (let i = 1; i < splitedSymbols.length; i++) {
    if (splitedSymbols[i].includes('#')) {
      return false;
    }
  }
  return true;
}

pristineComment.addValidator(
  hashTagText,
  validateTagContent,
  'Хештэг не может содержать спецсиволы'
);

function validateTagsNumber (value) {
  const splitedTags = value.split(' #');
  if (splitedTags.length > COMMENT_NUMBER_ALLOWED) {
    return false;
  }
  return true;
}

pristineComment.addValidator(
  hashTagText,
  validateTagsNumber,
  `Кол-во тегов не может быть больше ${COMMENT_NUMBER_ALLOWED}`
);

submitButton.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristineTag.validate();
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
