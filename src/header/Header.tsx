import React from "react";
import "./Header.css";
import { Icons, Logo, ScoreDisplay } from "./components";

//TODO use css modules

function Header() {
  return (
    <div className="header">
      <Logo />
      <ScoreDisplay />
      <Icons />
    </div>
  );
}

export default Header;
