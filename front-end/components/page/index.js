import React, { useState } from "react";
import isAnswerValid from "../../validators/answer";
import Question from "../question";
import styles from "./index.module.scss";
import sendMessage from "../../http/nextAPI/sendResponse";
import ProgressBar from "../progressBar";

export default function Page({
  updatePage,
  isTestPassed,
  updateIsTestPassed,
  previousPage,
  nextPage,
  text,
  images,
  expectedOrder,
  isAnswered,
  isFirst,
  isLast,
  sessionId,
  progress
}) {
  const buttonStyles = isFirst || isLast ? styles.buttonFull : styles.button;
  const contentContainerStyles = isAnswered
    ? styles.contentAnswered
    : styles.content;

  let nextPageAction = nextPage;
  let [ranking, setRanking] = useState([]);
  const [error, setError] = useState();

  const doesAnswerPassTest = (expected, actual) => {
    let isPassing = true;
    Object.keys(expected).forEach((index) => {
      if (expected[index] !== actual[index]) {
        isPassing = false;
      }
    });

    return isPassing;
  };

  if (images) {
    nextPageAction = isAnswered
      ? nextPage
      : () => {
        if (isAnswerValid(ranking, images, setError)) {
          if (expectedOrder) {
            const testpassing = doesAnswerPassTest(expectedOrder, ranking);
            updateIsTestPassed(testpassing);
          } else {
            const imageIndexes = Object.keys(ranking)
            for (let index = 0; index < imageIndexes.length; index++) {
              const imageIndex = imageIndexes[index];
              const imageSrc = images[imageIndex]
              const rank = ranking[imageIndex]

              sendMessage(imageSrc, rank, isTestPassed, sessionId)
            }
          }
          updatePage({ isAnswered: true });
          nextPage();
        }
      };
  }

  return (
    <div className={styles.container}>
      <div className={contentContainerStyles}>
        {images ? (
          <Question
            images={images}
            ranking={ranking}
            isAnswered={isAnswered}
            setRanking={setRanking}
          />
        ) : null}
        {text ? <p className={styles.text}>{text}</p> : null}
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      {!isFirst ? (
        <button className={buttonStyles} type="button" onClick={previousPage}>
          Previous
        </button>
      ) : null}
      {!isLast ? (
        <button className={buttonStyles} type="button" onClick={nextPageAction}>
          Next
        </button>
      ) : null}
      <ProgressBar progress={progress} />
    </div>
  );
}
