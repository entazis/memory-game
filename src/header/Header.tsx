import React from "react";
import styles from "./Header.module.css";
import { Icons, Logo, ScoreDisplay } from "./components";

function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <ScoreDisplay />
      <Icons />
    </div>
  );
}

export default Header;
