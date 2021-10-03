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
  const [state, updateState] = useState({ text })
  const updateCurrentPage = (update) => {
    updatePage(update);
    updateState(update);
  };

  const buttonStyles = isFirst || isLast ? styles.buttonFull : styles.button;
  return (
    <div className={styles.container}>
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
