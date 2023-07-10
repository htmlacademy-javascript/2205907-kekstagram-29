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

export {getRandomInteger, photoUrlGenerator, avatarUrlGenerator};
