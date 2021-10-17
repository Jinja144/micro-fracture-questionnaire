import React, { useState } from "react";
import styles from "./index.module.scss";

export default function Page({
  updatePage,
  previousPage,
  nextPage,
  text,
  isFirst,
  isLast,
}) {
  const [state, updateState] = useState({ text });
  const updateCurrentPage = (update) => {
    updatePage(update);
    updateState(update);
  };

  const updateCurrentPageTest = () => {
    updateCurrentPage({ text: "updated test text" });
  };

  const buttonStyles = isFirst || isLast ? styles.buttonFull : styles.button;
  return (
    <div className={styles.container}>
      <button
        className={buttonStyles}
        type="button"
        onClick={updateCurrentPageTest}
      >
        Update
      </button>
      <p className={styles.text}>{state.text}</p>
      {!isFirst ? (
        <button className={buttonStyles} type="button" onClick={previousPage}>
          Previous
        </button>
      ) : null}
      {!isLast ? (
        <button className={buttonStyles} type="button" onClick={nextPage}>
          Next
        </button>
      ) : null}
    </div>
  );
}
