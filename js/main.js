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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const photoUrlGenerator = (format) => function (Number) {
  return `photos/${Number}.${format}`;
};

const avatarUrlGenerator = (format) => function (Number) {
  return `img/avatar-${Number}.${format}`;
};


const jpgGenerator = photoUrlGenerator('jpg'); // As there are 25 photos existed

const svgGenerator = avatarUrlGenerator('svg');// As there are 6 avatar existed

//Function creates an object with necessary data
let currentNumber = 0;

const getPhotoInfo = () => {
  currentNumber += 1;
  const currentId = currentNumber;
  const randomNameIndex = getRandomInteger(0, AVATAR_NAMES.length - 1);
  const randomCommentIndex = getRandomInteger(0, COMMENTS_TEXT.length - 1);

  return {
    id: currentId,
    url: jpgGenerator(currentId),
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

const createPhotosData = () => Array.from({length: 25}, getPhotoInfo);
createPhotosData();
