import React from "react";
import styles from "./index.module.scss";

export default function ProgressBar({ progress }) {

  return (
    <div className={styles.container}><progress id="progress" max="1" value={progress} className={styles.bar}>{progress}</progress></div>
  );
}
