import React, { useState } from "react";
import isAnswerValid from "../../validators/answer";
import Question from "../question";
import styles from "./index.module.scss";

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
}) {
  const buttonStyles = isFirst || isLast ? styles.buttonFull : styles.button;
  const contentContainerStyles = isAnswered
    ? styles.contentAnswered
    : styles.content;

  let nextPageAction = nextPage;
  let [ranking, setRanking] = [{}, {}];
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
    [ranking, setRanking] = useState([]);
    nextPageAction = isAnswered
      ? nextPage
      : () => {
          if (isAnswerValid(ranking, images, setError)) {
            if (expectedOrder) {
              updateIsTestPassed(doesAnswerPassTest(expectedOrder, ranking));
            } else if (isTestPassed) {
              // call api async to send data to aws
            }
            updatePage({ isAnswered: true });
            nextPage();
          }
        };
  }

  return (
    <div className={styles.container}>
      <div className={contentContainerStyles}>
        {text ? <p className={styles.text}>{text}</p> : null}
        {images ? (
          <Question
            images={images}
            ranking={ranking}
            isAnswered={isAnswered}
            setRanking={setRanking}
          />
        ) : null}
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
    </div>
  );
}
