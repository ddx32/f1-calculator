import { POINTS_PER_POSITION } from "../constants/championshipRoundsData";
import { drivers, constructors } from "../services/standings";

export function getPointsPerRace(index, fastestLap) {
  const positionPoints = POINTS_PER_POSITION.fullGrandPrix[index];
  return index < 10 && fastestLap ? positionPoints + 1 : positionPoints || 0;
}

export function getGainedPoints(index, fastestLap) {
  const points = getPointsPerRace(index, fastestLap);
  return points ? `+ ${points}` : null;
}

export function getDriversChampionshipPositionChange(driver, currentPosition) {
  const previousPosition = drivers
    .getCurrentStandings()
    .findIndex((originalDriver) => originalDriver.name === driver.name);
  return previousPosition - currentPosition;
}

export function getConstructorsChampionshipPositionChange(
  constructor,
  raceResults
) {
  const previousStandings = constructors.getCurrentStandings();
  const currentStandings = constructors.getStandingsAfterNextRound(raceResults);
  const getConstructorPosition = (searchedArray) =>
    searchedArray.name === constructor.name;
  const prevPosition = previousStandings.findIndex(getConstructorPosition);
  const newPosition = currentStandings.findIndex(getConstructorPosition);
  return prevPosition - newPosition;
}
