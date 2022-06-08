import { isConstructorStanding, isDriverStanding } from "../common/typeGuards";
import { IRaceResult, IStanding, RaceTypes } from "../types/api";
import { getPointsPerRace } from "./pointsCalculations";

function sortPositions<T extends IStanding>(entrants: T[]) {
  return entrants.sort((a, b) => {
    const pointsComparison = b.points - a.points;

    if (pointsComparison === 0) {
      return b.wins - a.wins;
    }

    return pointsComparison;
  });
}

export function getStandingsAfterRounds<T extends IStanding>(
  currentStandings: T[],
  raceResultsList: IRaceResult[][],
  raceType = RaceTypes.GRAND_PRIX
) {
  const resultReducer = (
    standings: T[],
    result: IRaceResult,
    position: number
  ) => {
    const standingIndex = standings.findIndex((standing) => {
      if (isDriverStanding(standing)) {
        return standing.Driver.driverId === result.Driver.driverId;
      }

      if (isConstructorStanding(standing)) {
        return (
          standing.Constructor.constructorId ===
          result.Constructors[0].constructorId
        );
      }

      return false;
    });

    const points = getPointsPerRace(position, result.fastestLap, raceType);

    const updatedStandings = [...standings];
    updatedStandings[standingIndex] = {
      ...updatedStandings[standingIndex],
      points: standings[standingIndex].points + points,
      wins:
        position === 0
          ? standings[standingIndex].wins + 1
          : standings[standingIndex].wins,
    };
    return updatedStandings;
  };

  const finalStandings = raceResultsList.reduce((standings, raceResults) => {
    return raceResults.reduce(resultReducer, standings);
  }, currentStandings);

  const sortedPositions = sortPositions(finalStandings);
  return sortedPositions.map((standing, index) => ({
    ...standing,
    position: index + 1,
    positionText: (index + 1).toString(),
  }));
}
