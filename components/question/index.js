import React from "react";
import styles from "./index.module.scss";

export default function Question({ images, ranking, isAnswered, setRanking }) {
  const updateRanking = (event) => {
    let update = {};
    const target = event.currentTarget;
    const imageInputRowTitles = [...target.getElementsByClassName("imageId")];
    imageInputRowTitles.forEach((imageTitleElement) => {
      const imageId = imageTitleElement.innerText;
      const inputElements = [
        ...target.querySelectorAll(`input[name="${imageId}"]`),
      ];
      for (let index = 0; index < inputElements.length; index += 1) {
        const inputElement = inputElements[index];
        if (inputElement.checked) {
          const imageIndex = imageId - 1;
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
      {images.map((image, index) => (
        <div className={styles.imageContainer}>
          <p>{index + 1}</p>
          <img
            className={styles.image}
            src={image}
            alt="A microfracture scan"
          />
        </div>
      ))}
      {isAnswered ? (
        <p>Question has already been answered</p>
      ) : (
        <div className={styles.answerSection}>
          <span className={styles.titleLeft}>Least Clear</span>
          <span className={styles.titleMid}>to</span>
          <span className={styles.titleRight}>Most Clear</span>
          <span className={firstImageIdClassList}>
            1
          </span>
          <input
            className={styles.inputLeast1}
            type="radio"
            id="least"
            name="1"
          />
          <input className={styles.inputMid1} type="radio" id="mid" name="1" />
          <input
            className={styles.inputMost1}
            type="radio"
            id="most"
            name="1"
          />
          <span className={secondImageIdClassList}>
            2
          </span>
          <input
            className={styles.inputLeast2}
            type="radio"
            id="least"
            name="2"
          />
          <input className={styles.inputMid2} type="radio" id="mid" name="2" />
          <input
            className={styles.inputMost2}
            type="radio"
            id="most"
            name="2"
          />
          <span className={thirdImageIdClassList}>
            3
          </span>
          <input
            className={styles.inputLeast3}
            type="radio"
            id="least"
            name="3"
          />
          <input className={styles.inputMid3} type="radio" id="mid" name="3" />
          <input
            className={styles.inputMost3}
            type="radio"
            id="most"
            name="3"
          />
        </div>
      )}
    </div>
  );
}
