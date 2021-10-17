import React, { useState } from "react";
import styles from "./index.module.scss";

export default function Question({ images, ranking, setRanking }) {
  const [state, updateState] = useState(ranking);
  const updateRanking = (update) => {
    const newRanking = { ...state, update };
    setRanking(newRanking)
    updateState(newRanking)
  }

  const rankStyleMap = { 1: styles.imageLeft, 2: styles.imageMid, 3: styles.imageRight }
  // use image id keys to search ranking for image rank
  // ranking is object containing image ids associated to rank of 1-3. If no rank is found then default to 2. Use grid and change styling depending on rank
  return (
    <div className={styles.container}>
      <span className={styles.titleLeft}>Least Clear</span>
      <span className={styles.titleMid}>Mid</span>
      <span className={styles.titleRight}>Most Clear</span>
    </div>
  );
}
