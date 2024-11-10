import React from "react";
import styles from "../Header.module.css";
import { logo } from "../../../assets";

//TODO use alias for long include paths (assets)

export default function Logo() {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="logo" />
    </div>
  );
}
