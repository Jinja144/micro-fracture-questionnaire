export default function createQuestionPages() {
  const question = "Please identify in which image the flaws appear the **strongest** and in which they appear the **weakest**.";
  const numPagesNeeded = 10;
  const minimumImageId = 1;
  const maximumImageId = 20;
  const pages = [];

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getRandomImageId = () => {
    let imageId = 0;
    while (imageId < minimumImageId) {
      imageId = getRandomInt(maximumImageId)
    }
    return imageId;
  }

  const getUniqueImageIds = () => {
    let imageIdSet = new Set();

    while (imageIdSet.size < 3) {
      imageIdSet.add(getRandomImageId(maximumImageId))
    }

    return [...imageIdSet]
  }

  for (let index = 0; index < numPagesNeeded; index++) {
    const imageIds = getUniqueImageIds();

    pages.push({
      text: question,
      images: [
        `https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/${imageIds[0]}.png`,
        `https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/${imageIds[1]}.png`,
        `https://micro-fracture-scan-questionnaire-images.s3.eu-west-2.amazonaws.com/${imageIds[2]}.png`,
      ],
    })
  }

  return pages;
}