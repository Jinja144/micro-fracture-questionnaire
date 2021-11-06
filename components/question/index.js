import React from "react";
import styles from "./index.module.scss";

export default function Question({ images, ranking, isAnswered, setRanking }) {
  const updateRanking = (event) => {
    let update = {};
    const target = event.currentTarget;
    const imageInputRowTitles = [...target.getElementsByClassName("image-id")];
    imageInputRowTitles.forEach((imageTitleElement) => {
      const imageTitle = imageTitleElement.innerText;
      const inputElements = [
        ...target.querySelectorAll(`input[name="${imageTitle}"]`),
      ];
      const imageIndex = imageTitle - 1;
      for (let index = 0; index < inputElements.length; index += 1) {
        const inputElement = inputElements[index];
        if (inputElement.checked) {
          update = { ...update, [imageIndex]: index };
        }
      }
    });
    const newRanking = { ...ranking, ...update };
    setRanking(newRanking);
  };

  const styleMap = [styles.imageLeft, styles.imageMid, styles.imageRight];
  // use image id keys to search ranking for image rank
  // ranking is object containing image ids associated to rank of 0-2. If no rank is found then default to 2. Use grid and change styling depending on rank
  return (
    <div className={styles.container} onChange={updateRanking}>
      {images.map((image, index) => {
        const sectionClass = styleMap[index];
        return (
          <div className={sectionClass}>
            <p>{index + 1}</p>
            <img src={image} alt="A microfracture scan" />
          </div>
        );
      })}
      {isAnswered ? (
        <p>Question has already been answered</p>
      ) : (
        <>
          <span className={styles.titleLeft}>Least Clear</span>
          <span className={styles.titleMid}>Mid</span>
          <span className={styles.titleRight}>Most Clear</span>
          {images.map((image, index) => {
            const imageId = index + 1;
            return (
              <div>
                <span className="image-id">{imageId}</span>
                <input type="radio" id="least" name={imageId} />
                <input type="radio" id="mid" name={imageId} />
                <input type="radio" id="most" name={imageId} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
