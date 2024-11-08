import React from "react";
import styles from "../Header.module.css";

export default function ScoreDisplay({
  endedAt,
  won,
}: {
  endedAt: number | null;
  won: boolean;
}) {
  return endedAt ? (
    won ? (
      <div className={styles.won}>won</div>
    ) : (
      <div className={styles.lost}>lost</div>
    )
  ) : null;
}
