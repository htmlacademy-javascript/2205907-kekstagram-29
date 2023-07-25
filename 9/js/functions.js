const lengthCheck = function (str, length) {
  return str.length === length;
};

lengthCheck();

const reverse = (s) => s.split('').reverse().join('');

const isPalindrome = function (str) {
  const editedText = str.trim().toLowerCase();
  return editedText === reverse(editedText);
};

isPalindrome();

const integerNumber = function (str) {
  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      result = result + str[i];
    }
  }

  return parseInt(result, 10);
};

integerNumber();
