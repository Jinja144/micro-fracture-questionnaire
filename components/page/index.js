import React, { useState } from "react";
import Question from "../question";
import styles from "./index.module.scss";

export default function Page({
  updatePage,
  updateIsTestPassed,
  previousPage,
  nextPage,
  text,
  images,
  expectedOrder,
  answered,
  isFirst,
  isLast,
}) {
  const buttonStyles = isFirst || isLast ? styles.buttonFull : styles.button;
  const contentContainerStyles = answered
    ? styles.contentAnswered
    : styles.content;

  let nextPageAction = nextPage;
  let [ranking, setRanking] = [{}, {}];

  if (images) {
    [ranking, setRanking] = useState({});
    nextPageAction = answered
      ? nextPage
      : () => {
          updatePage({ answered: true });
          if (expectedOrder) {
            updateIsTestPassed(expectedOrder === ranking);
          } else {
            // call api async to send data to aws
          }
          nextPage();
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
            setRanking={setRanking}
          />
        ) : null}
      </div>
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
