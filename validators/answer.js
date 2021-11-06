const areImageRatingsUnique = (ratings) => {
  const givenRatings = [];
  let isValid = true;
  Object.values(ratings).forEach((rating) => {
    if (givenRatings.indexOf(rating) === -1) {
      givenRatings.push(rating);
    } else {
      isValid = false;
    }
  });
  return isValid;
};

const isAnswerValid = (answer, images, setError) => {
  if (Object.keys(answer).length !== images.length) {
    setError("Please rate each of the images before continuing");
    return false;
  }

  if (!areImageRatingsUnique(answer)) {
    setError("Please give each image a unique rating before continuing");
    return false;
  }

  return true;
};

export default isAnswerValid;
