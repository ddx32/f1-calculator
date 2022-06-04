import { IStanding, TitleChance } from "../constants/types";
import React from "react";

function getDescription(titleChance: TitleChance): string {
  switch (titleChance) {
    case TitleChance.SECURED:
      return "Championship title already secured";
    case TitleChance.POTENTIAL:
      return "Mathematically in the title fight";
    case TitleChance.NONE:
      return "Out of the title fight";
  }
}

export function TitleTrophy<T extends IStanding>({
  standing,
}: {
  standing: T;
}) {
  return standing.titleChance ? (
    <span
      className={
        standing.titleChance === TitleChance.POTENTIAL ? "potentialTitle" : ""
      }
      title={getDescription(standing.titleChance)}
    >
      {(standing.titleChance === TitleChance.POTENTIAL ||
        standing.titleChance === TitleChance.SECURED) &&
        "🏆"}
      {standing.titleChance === TitleChance.NONE && "–"}
    </span>
  ) : null;
}
