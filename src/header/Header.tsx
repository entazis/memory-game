import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../store/hooks";
import { selectProgress, selectSettings } from "../game/game.slice";

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

function Logo() {
  //TODO insert logo
  return (
    <div className="logo">
      <span>mem</span>
      <span className="dot">•</span>
      <span>mission</span>
    </div>
  );
}

function ScoreDisplay() {
  const { score, elapsedTime, mistakes } = useAppSelector(selectProgress);
  const { timer } = useAppSelector(selectSettings);

  const remainingTime = Math.round((timer - elapsedTime) / 1000);
  return (
    <div className="score">
      <span className="score-number">{remainingTime}</span>
      <div className="matches">
        <span>{score} matches</span>
        <span>{mistakes} mistakes</span>
      </div>
    </div>
  );
}

function Icons() {
  return (
    <div className="icons">
      <FontAwesomeIcon icon={faCog} className="icon settings" />
      <FontAwesomeIcon icon={faSyncAlt} className="icon refresh" />
    </div>
  );
}

export default Header;
