import React from "react";
import styles from "./index.module.scss";

export default function Question({ images, ranking, isAnswered, setRanking }) {
  const imageReferenceMap = ['A', 'B', 'C']

  const updateRanking = (event) => {
    let update = {};
    const target = event.currentTarget;
    const imageInputRowTitles = [...target.getElementsByClassName("imageId")];
    imageInputRowTitles.forEach((imageTitleElement) => {
      const imageRef = imageTitleElement.innerText;
      const inputElements = [
        ...target.querySelectorAll(`input[name="${imageRef}"]`),
      ];
      for (let index = 0; index < inputElements.length; index += 1) {
        const inputElement = inputElements[index];
        if (inputElement.checked) {
          const imageIndex = imageReferenceMap.indexOf(imageRef);
          update = { ...update, [imageIndex]: index - 1 }; // -1 converts it from 0-2 scale to -1 - 1;
        }
      }
    });
    const newRanking = { ...ranking, ...update };
    setRanking(newRanking);
  };

  const firstImageIdClassList = `${styles.inputImageId1} imageId`;
  const secondImageIdClassList = `${styles.inputImageId2} imageId`;
  const thirdImageIdClassList = `${styles.inputImageId3} imageId`;

  return (
    <div className={styles.container} onChange={updateRanking}>
      <div className={styles.questions} onChange={updateRanking}>
        {images.map((image, index) => (
          <span key={imageReferenceMap[index]} className={styles.imageContainer}>
            <div className={styles.imageIdContainer}>
              <p className={styles.imageId}>{imageReferenceMap[index]}</p>
            </div>
            <img
              className={styles.image}
              src={image}
              alt="A microfracture scan"
            />
          </span>
        ))}
      </div>
      {isAnswered ? (
        <p className={styles.answered}>This question has already been answered</p>
      ) : (
        <div className={styles.answerSection}>
          <span className={styles.titleLeft}>Least Clear</span>
          <span className={styles.titleMid}>to</span>
          <span className={styles.titleRight}>Most Clear</span>
          <span className={firstImageIdClassList}>A</span>
          <input
            className={styles.inputLeast1}
            type="radio"
            id="least"
            name="A"
          />
          <input className={styles.inputMid1} type="radio" id="mid" name="A" />
          <input
            className={styles.inputMost1}
            type="radio"
            id="most"
            name="A"
          />
          <span className={secondImageIdClassList}>B</span>
          <input
            className={styles.inputLeast2}
            type="radio"
            id="least"
            name="B"
          />
          <input className={styles.inputMid2} type="radio" id="mid" name="B" />
          <input
            className={styles.inputMost2}
            type="radio"
            id="most"
            name="B"
          />
          <span className={thirdImageIdClassList}>C</span>
          <input
            className={styles.inputLeast3}
            type="radio"
            id="least"
            name="C"
          />
          <input className={styles.inputMid3} type="radio" id="mid" name="C" />
          <input
            className={styles.inputMost3}
            type="radio"
            id="most"
            name="C"
          />
        </div>
      )}
    </div>
  );
}
