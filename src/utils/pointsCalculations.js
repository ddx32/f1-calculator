import driverData from "../data/driverData";
import { getConstructorStandings, getDriverStandings } from "./getStandings";

export const pointsPerPosition = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

function getPointsPerRace(index, fastestLap) {
  const positionPoints = pointsPerPosition[index];
  return index < 10 && fastestLap ? positionPoints + 1 : positionPoints || 0;
}

function getUpdatedDriverData(raceResults) {
  return [...raceResults].map((driver, index) => ({
    ...driver,
    points:
      raceResults[index].points + getPointsPerRace(index, driver.fastestLap),
    wins: index === 0 ? driver.wins + 1 : driver.wins,
  }));
}

export function getGainedPoints(index, fastestLap) {
  const points = getPointsPerRace(index, fastestLap);
  return points ? `+ ${points}` : null;
}

export function getUpdatedDriversPointsStandings(raceResults) {
  const updatedDriverData = getUpdatedDriverData(raceResults);
  return getDriverStandings(updatedDriverData);
}

export function getDriversChampionshipPositionChange(driver, currentPosition) {
  const previousPosition = driverData.findIndex(
    (originalDriver) => originalDriver.name === driver.name
  );
  return previousPosition - currentPosition;
}

export function getUpdatedConstructorsPointsStandings(raceResults) {
  const updatedDriverData = getUpdatedDriverData(raceResults);
  return getConstructorStandings(updatedDriverData);
}
