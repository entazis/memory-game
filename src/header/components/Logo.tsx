import React from "react";
import styles from "../Header.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span>mem</span>
      <span className={styles.dot}>•</span>
      <span>mission</span>
    </div>
  );
}
