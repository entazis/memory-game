import React from "react";
import "../Header.css";

export default function ScoreDisplay({
  endedAt,
  won,
}: {
  endedAt: Date | null;
  won: boolean;
}) {
  return endedAt ? (
    won ? (
      <div className="won">won</div>
    ) : (
      <div className="lost">lost</div>
    )
  ) : null;
}
