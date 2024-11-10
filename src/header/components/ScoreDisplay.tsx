import React from "react";
import styles from "../Header.module.css";
import { useAppSelector } from "../../store/hooks";
import { selectProgress, selectSettings } from "../../game/game.slice";
import { Ended } from "./index";

//TODO add style to the component, make it better looking

export default function ScoreDisplay() {
  const { score, elapsedTime, mistakes, endedAt, won } =
    useAppSelector(selectProgress);
  const { timer } = useAppSelector(selectSettings);

  const remainingTime = Math.round(timer - elapsedTime);
  return (
    <div className={styles.score}>
      <Ended endedAt={endedAt} won={won} />
      <div className={styles.scoreNumber}>{remainingTime}</div>
      <div className={styles.matches}>
        <span>{score} matches</span>
        <span>{mistakes} mistakes</span>
      </div>
    </div>
  );
}
