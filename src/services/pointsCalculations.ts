import { POINTS_PER_POSITION } from "../constants/scoring";
import { RaceType } from "../types/entities";

export function getPointsPerRace(
  index: number,
  fastestLap: boolean,
  raceType = RaceType.GRAND_PRIX
): number {
  const positionPoints =
    raceType === RaceType.GRAND_PRIX
      ? POINTS_PER_POSITION.fullGrandPrix[index]
      : POINTS_PER_POSITION.sprintRace[index];

  if (raceType === RaceType.SPRINT_RACE) {
    return positionPoints || 0;
  }

  return index < 10 && fastestLap ? positionPoints + 1 : positionPoints || 0;
}
