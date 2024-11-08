import React from "react";
import "../Header.css";
import { useAppSelector } from "../../store/hooks";
import { selectProgress, selectSettings } from "../../game/game.slice";
import Ended from "./Ended";

//TODO make the "ended" nicer

export default function ScoreDisplay() {
  const { score, elapsedTime, mistakes, endedAt, won } =
    useAppSelector(selectProgress);
  const { timer } = useAppSelector(selectSettings);

  const remainingTime = Math.round(timer - elapsedTime);
  return (
    <div className="score">
      <Ended endedAt={endedAt} won={won} />
      <div className="score-number">{remainingTime}</div>
      <div className="matches">
        <span>{score} matches</span>
        <span>{mistakes} mistakes</span>
      </div>
    </div>
  );
}
