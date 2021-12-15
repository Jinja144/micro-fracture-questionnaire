const areImageRatingsUnique = (ratings) => {
  const givenRatings = []; // [imageId => rating, 1 => 0, 2 => -1]
  Object.keys(ratings).forEach((image) => {
    const rating = ratings[image]
    if (rating === 0 || givenRatings.indexOf(rating) === -1) {
      givenRatings.push(rating);
    } else {
      return false;
    }
  });
  return true;
};

const isAnswerValid = (answer, images, setError) => {
  if (Object.keys(answer).length !== images.length) {
    setError("Please rate each of the images before continuing");
    return false;
  }

  if (!areImageRatingsUnique(answer)) {
    setError("Only 1 image can be the most/least clear");
    return false;
  }

  return true;
};

export default isAnswerValid;
