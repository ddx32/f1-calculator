import { isConstructorStanding, isDriverStanding } from "../common/typeGuards";
import { FASTEST_LAP_POINTS, POINTS_PER_POSITION } from "../constants/scoring";
import { RaceEvent, RaceType, Standing } from "../types/entities";
import { getRemainingRaces } from "./getRemainingRaces";

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

export function getGainedPoints(index: number, fastestLap: boolean): string {
  const points = getPointsPerRace(index, fastestLap);
  return points ? `+ ${points}` : "";
}

export function getPositionChange<T extends Standing>(
  standing: T,
  currentStandings: T[]
): number {
  const previousStanding = currentStandings.find((standingItem) => {
    if (isDriverStanding(standing) && isDriverStanding(standingItem)) {
      return standingItem.Driver.driverId === standing.Driver.driverId;
    }

    if (
      isConstructorStanding(standing) &&
      isConstructorStanding(standingItem)
    ) {
      return (
        standingItem.Constructor.constructorId ===
        standing.Constructor.constructorId
      );
    }

    return null;
  });

  return previousStanding ? previousStanding.position - standing.position : 0;
}

export function getRemainingDriverPoints(
  raceSchedule: RaceEvent[],
  currentRound: number,
  position: number = 1
): number {
  const eventsRemaining = getRemainingRaces(raceSchedule, currentRound);
  const fastestLap = position === 1 ? FASTEST_LAP_POINTS : 0;
  const gpPoints =
    eventsRemaining.grandsPrix *
    (POINTS_PER_POSITION.fullGrandPrix[position - 1] + fastestLap);
  const sprintPoints =
    eventsRemaining.sprintRaces * POINTS_PER_POSITION.sprintRace[position - 1];
  return gpPoints + sprintPoints;
}

export function getRemainingConstructorsPoints(
  raceSchedule: RaceEvent[],
  currentRound: number
): number {
  return (
    getRemainingDriverPoints(raceSchedule, currentRound, 1) +
    getRemainingDriverPoints(raceSchedule, currentRound, 2)
  );
}
