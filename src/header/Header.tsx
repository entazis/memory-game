import React from "react";
import styles from "./Header.module.css";
import { Logo, Menu, ScoreDisplay } from "./components";
import { Container } from "react-bootstrap";

function Header() {
  return (
    <Container className={styles.header}>
      <Logo />
      <ScoreDisplay />
      <Menu />
    </Container>
  );
}

export default Header;
