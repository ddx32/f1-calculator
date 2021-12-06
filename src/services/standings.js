import DRIVER_DATA from "../constants/driverData";
import {
  POINTS_PER_POSITION,
  ROUNDS_TO_GO,
} from "../constants/championshipRoundsData";
import { getPointsPerRace } from "../utils/pointsCalculations";

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
  return {
    ...driver,
    maximumPoints:
      driver.points + roundsToGo * POINTS_PER_POSITION.fullGrandPrix[0],
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
        updatedPointsDriverEntry
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

export const constructors = {
  getCurrentStandings: function () {
    const constructorsData = getConstructorsData(DRIVER_DATA);
    return sortPositions(constructorsData);
  },
  getStandingsAfterNextRound: function (raceResults) {
    const updatedDriverData = drivers.getStandingsAfterNextRound(raceResults);
    const updatedConstructorData = getConstructorsData(updatedDriverData);
    return sortPositions(updatedConstructorData);
  },
};
