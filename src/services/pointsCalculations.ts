import { POINTS_PER_POSITION } from "../constants/championshipRoundsData";
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
