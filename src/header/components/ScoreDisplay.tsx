import React from "react";
import "../Header.css";
import { useAppSelector } from "../../store/hooks";
import { selectProgress, selectSettings } from "../../game/game.slice";

export default function ScoreDisplay() {
  const { score, elapsedTime, mistakes } = useAppSelector(selectProgress);
  const { timer } = useAppSelector(selectSettings);

  const remainingTime = Math.round(timer - elapsedTime);
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
