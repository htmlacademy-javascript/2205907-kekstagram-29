const commentList = document.querySelector('.social__comments');

// const newCommenItem = document.createElement('li');
// newCommenItem.classList.add('social__comment');

// console.log(newCommenItem);

// const newCommentText = document.createElement('p');
// newCommentText.textContent = `Комментарий № ${[i]}`;

const createCommentTemplate = () => {
  const newCommenItem = document.createElement('li');
  newCommenItem.classList.add('social__comment');

  const newCommentText = document.createElement('p');
  newCommentText.textContent = 'Новый комментарий';
  newCommenItem.appendChild(newCommentText);
  commentList.appendChild(newCommenItem);
};

// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();
// createCommentTemplate();

const deleteComment = () => {
  const allComments = document.querySelector('.social__comment');
  allComments.remove();
};

export {createCommentTemplate, deleteComment};

