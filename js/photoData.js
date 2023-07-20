import {getRandomInteger, photoUrlGenerator, avatarUrlGenerator} from './util.js';

const AVATAR_NAMES = [
  'Bob',
  'Alexandra',
  'Eleonora',
  'Tanya',
  'Maria',
];

const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const jpgGenerator = photoUrlGenerator('jpg'); // As there are 25 photos existed

const svgGenerator = avatarUrlGenerator('svg');// As there are 6 avatar existed

//Function creates an object with necessary data
const getPhotoInfo = (i) => {
  const randomNameIndex = getRandomInteger(0, AVATAR_NAMES.length - 1);
  const randomCommentIndex = getRandomInteger(0, COMMENTS_TEXT.length - 1);

  return {
    id: i++,
    url: jpgGenerator(i++),
    description: 'Хорошее фото',
    likes:getRandomInteger(15, 200),
    comments: {
      id: getRandomInteger(1, 1000),
      avatar: svgGenerator(getRandomInteger(1, 6)),
      message: COMMENTS_TEXT[randomCommentIndex],
      name: AVATAR_NAMES[randomNameIndex],
    },
  };
};

const createPhotosData = () => Array.from({length: 25}, (_, i) => getPhotoInfo(i));

export {createPhotosData, getPhotoInfo };
