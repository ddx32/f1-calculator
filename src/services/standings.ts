import { isConstructorStanding, isDriverStanding } from "../common/typeGuards";
import { Standing, UpcomingRaceResult } from "../types/entities";
import { getPointsPerRace } from "./pointsCalculations";

function sortPositions<T extends Standing>(entrants: T[]) {
  return entrants.sort((a, b) => {
    const pointsComparison = b.points - a.points;

    if (pointsComparison === 0) {
      return b.wins - a.wins;
    }

    return pointsComparison;
  });
}

function getStandingsAfterRound<T extends Standing>(
  standings: T[],
  upcomingRaceResult: UpcomingRaceResult,
): T[] {
  return upcomingRaceResult.results.reduce(
    (standings, currentResult, position) => {
      const standingIndex = standings.findIndex((standing) => {
        if (isDriverStanding(standing)) {
          return standing.Driver.driverId === currentResult.Driver.driverId;
        }

        if (isConstructorStanding(standing)) {
          return (
            standing.Constructor.constructorId ===
            currentResult.Constructors[0].constructorId
          );
        }

        return false;
      });

      const points = getPointsPerRace(
        position,
        upcomingRaceResult.RaceEvent.eventType,
      );

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
    },
    standings,
  );
}

export function getStandingsAfterRounds<T extends Standing>(
  currentStandings: T[],
  raceResultList: UpcomingRaceResult[],
) {
  const finalStandings: T[] = raceResultList.reduce(
    (standings, upcomingRaceResult) => {
      const standingsAfterRound = getStandingsAfterRound(
        standings,
        upcomingRaceResult,
      );
      return standingsAfterRound;
    },
    currentStandings,
  );

  const sortedPositions = sortPositions(finalStandings);
  return sortedPositions.map((standing, index) => ({
    ...standing,
    position: index + 1,
    positionText: (index + 1).toString(),
  }));
}
