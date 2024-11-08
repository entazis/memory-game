import React from "react";
import styles from "./Header.module.css";
import { Logo, Menu, ScoreDisplay } from "./components";

function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <ScoreDisplay />
      <Menu />
    </div>
  );
}

export default Header;
