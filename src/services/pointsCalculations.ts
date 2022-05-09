import {
  FASTEST_LAP_POINTS,
  POINTS_PER_POSITION,
  ROUNDS_TO_GO,
  SPRINT_RACES_TO_GO,
} from "../constants/championshipRoundsData";
import { drivers, constructors } from "./standings";

import type {
  DriverEntry,
  DriverResult,
  ConstructorEntry,
} from "../constants/types";

export function getPointsPerRace(index: number, fastestLap: boolean): number {
  const positionPoints = POINTS_PER_POSITION.fullGrandPrix[index];
  return index < 10 && fastestLap ? positionPoints + 1 : positionPoints || 0;
}

export function getGainedPoints(index: number, fastestLap: boolean): string {
  const points = getPointsPerRace(index, fastestLap);
  return points ? `+ ${points}` : "";
}

export function getDriversChampionshipPositionChange(
  driver: DriverEntry,
  currentPosition: number
): number {
  const previousPosition = drivers
    .getCurrentStandings()
    .findIndex((originalDriver) => originalDriver.name === driver.name);
  return previousPosition - currentPosition;
}

export function getConstructorsChampionshipPositionChange(
  constructor: ConstructorEntry,
  raceResults: DriverResult[]
): number {
  const previousStandings = constructors.getCurrentStandings();
  const currentStandings = constructors.getStandingsAfterNextRound(raceResults);
  const getConstructorPosition = (searchedArray: ConstructorEntry) =>
    searchedArray.name === constructor.name;
  const prevPosition = previousStandings.findIndex(getConstructorPosition);
  const newPosition = currentStandings.findIndex(getConstructorPosition);
  return prevPosition - newPosition;
}

export function getRemainingDriverPoints(position: number = 1): number {
  const fastestLap = position === 1 ? FASTEST_LAP_POINTS : 0;
  const gpPoints =
    ROUNDS_TO_GO *
    (POINTS_PER_POSITION.fullGrandPrix[position - 1] + fastestLap);
  const sprintPoints =
    SPRINT_RACES_TO_GO * POINTS_PER_POSITION.sprintRace[position - 1];
  return gpPoints + sprintPoints;
}

export function getRemainingConstructorsPoints(): number {
  return getRemainingDriverPoints(1) + getRemainingDriverPoints(2);
}
