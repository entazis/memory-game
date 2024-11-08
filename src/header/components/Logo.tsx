import React from "react";
import styles from "../Header.module.css";
import { logo } from "../../assets";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
    </div>
  );
}
