import DRIVER_DATA from "../constants/driverData";
import {
  POINTS_PER_POSITION,
  ROUNDS_TO_GO,
  FASTEST_LAP_POINTS,
} from "../constants/championshipRoundsData";
import { getPointsPerRace } from "./pointsCalculations";

function sortPositions(drivers) {
  return drivers.sort((a, b) => {
    const pointsComparison = b.points - a.points;

    if (pointsComparison === 0) {
      return b.wins - a.wins;
    }

    return pointsComparison;
  });
}

function getDriverMaximumResults(driver, roundsToGo) {
  const maximumPoints =
    driver.points +
    roundsToGo * (POINTS_PER_POSITION.fullGrandPrix[0] + FASTEST_LAP_POINTS);
  return {
    ...driver,
    maximumPoints,
    maximumWins: driver.wins + roundsToGo,
  };
}

export const drivers = {
  getCurrentStandings: function () {
    const drivers = DRIVER_DATA.map((driver) =>
      getDriverMaximumResults(driver, ROUNDS_TO_GO)
    );
    return sortPositions(drivers);
  },
  getStandingsAfterNextRound: function (raceResults) {
    const updatedStandings = raceResults.reduce((acc, current, index) => {
      const originalDriverEntry = DRIVER_DATA.find(
        (driver) => driver.name === current.name
      );
      const gainedPoints = getPointsPerRace(index, current.fastestLap);
      const gainedWins = index === 0 ? 1 : 0;

      const updatedPointsDriverEntry = {
        ...originalDriverEntry,
        points: originalDriverEntry.points + gainedPoints,
        wins: originalDriverEntry.wins + gainedWins,
      };
      const updatedMaxResultDriverEntry = getDriverMaximumResults(
        updatedPointsDriverEntry,
        ROUNDS_TO_GO - 1
      );
      acc.push(updatedMaxResultDriverEntry);
      return acc;
    }, []);
    return sortPositions(updatedStandings);
  },
};

function getConstructorsData(driverData) {
  return driverData.reduce((acc, current) => {
    const teamIndex = acc.findIndex((team) => team.name === current.team);

    if (teamIndex < 0) {
      acc.push({
        name: current.team,
        points: current.points,
        wins: current.wins,
      });
    } else {
      acc[teamIndex].points += current.points;
      acc[teamIndex].wins += current.wins;
    }

    return acc;
  }, []);
}

function getConstructorsMaximumResult(constructor, roundsToGo) {
  const maximumPoints =
    constructor.points +
    roundsToGo *
      (POINTS_PER_POSITION.fullGrandPrix[0] +
        POINTS_PER_POSITION.fullGrandPrix[1] +
        FASTEST_LAP_POINTS);
  return {
    ...constructor,
    maximumPoints,
    maximumWins: constructor.wins + roundsToGo,
  };
}

export const constructors = {
  getCurrentStandings: function () {
    const constructorsData = getConstructorsData(DRIVER_DATA).map(
      (constructor) => {
        return getConstructorsMaximumResult(constructor, ROUNDS_TO_GO);
      }
    );
    return sortPositions(constructorsData);
  },
  getStandingsAfterNextRound: function (raceResults) {
    const updatedDriverData = drivers.getStandingsAfterNextRound(raceResults);
    const updatedConstructorData = getConstructorsData(updatedDriverData).map(
      (constructor) => {
        return getConstructorsMaximumResult(constructor, ROUNDS_TO_GO - 1);
      }
    );
    return sortPositions(updatedConstructorData);
  },
};
