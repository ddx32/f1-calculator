import { getRemainingEventCount } from "../common/getRemainingEvents";
import { isConstructorStanding, isDriverStanding } from "../common/typeGuards";
import { FASTEST_LAP_POINTS, POINTS_PER_POSITION } from "../constants/scoring";
import { RaceEvent, Standing, TitleChance } from "../types/entities";

function getRemainingDriverPoints(
  raceSchedule: RaceEvent[],
  lastRound: RaceEvent,
  bestPosition: number = 1
) {
  const { grandsPrixRemaining, sprintsRemaining } = getRemainingEventCount(
    raceSchedule,
    lastRound
  );

  const grandsPrixPointsRemaining =
    grandsPrixRemaining * POINTS_PER_POSITION.fullGrandPrix[bestPosition - 1];
  const sprintPointsRemaining =
    sprintsRemaining * POINTS_PER_POSITION.sprintRace[bestPosition - 1];
  const fastestLapPointsRemaining =
    bestPosition === 1 ? grandsPrixRemaining * FASTEST_LAP_POINTS : 0;

  return (
    grandsPrixPointsRemaining +
    sprintPointsRemaining +
    fastestLapPointsRemaining
  );
}

function getRemainingConstructorPoints(
  raceSchedule: RaceEvent[],
  lastRound: RaceEvent
) {
  return (
    getRemainingDriverPoints(raceSchedule, lastRound, 1) +
    getRemainingDriverPoints(raceSchedule, lastRound, 2)
  );
}

function getStandingsWithMaximumValues<T extends Standing>(
  standings: T[],
  raceSchedule: RaceEvent[],
  lastRound: RaceEvent
) {
  const { grandsPrixRemaining } = getRemainingEventCount(
    raceSchedule,
    lastRound
  );

  return standings.map((standing) => {
    if (isDriverStanding(standing)) {
      return {
        ...standing,
        maximumPoints:
          standing.points + getRemainingDriverPoints(raceSchedule, lastRound),
        maximumWins: standing.wins + grandsPrixRemaining,
      };
    }

    if (isConstructorStanding(standing)) {
      return {
        ...standing,
        maximumPoints:
          standing.points +
          getRemainingConstructorPoints(raceSchedule, lastRound),
        maximumWins: standing.wins + grandsPrixRemaining,
      };
    }

    return standing;
  });
}

function getTitleChance(
  chanceOnPoints: boolean,
  chanceOnWins: boolean,
  isPointsTied: boolean
): TitleChance {
  if (chanceOnPoints) {
    return TitleChance.POTENTIAL;
  } else if (isPointsTied && chanceOnWins) {
    return TitleChance.POTENTIAL;
  }

  return TitleChance.NONE;
}

export function getStandingsWithTitleChance<T extends Standing>(
  standings: T[],
  raceSchedule: RaceEvent[],
  lastRound: RaceEvent
) {
  const standingsWithMaximumValues = getStandingsWithMaximumValues(
    standings,
    raceSchedule,
    lastRound
  );

  if (
    !standingsWithMaximumValues.every((standing) => "maximumPoints" in standing)
  ) {
    throw new Error("Standings in the list must contain maximumPoints");
  }

  const standingsWithTitleChance = standingsWithMaximumValues.map(
    (standing, index) => {
      const others = standings.filter((_, listIndex) => index !== listIndex);

      const chanceOnPoints = others.every((entrant) => {
        standing.maximumPoints = standing.maximumPoints || 0;
        return entrant.points < standing.maximumPoints;
      });

      const isPointsTied = others.some((entrant) => {
        return entrant.points === standing.maximumPoints;
      });

      const chanceOnWins = others.every((entrant) => {
        standing.maximumWins = standing.maximumWins || 0;
        return entrant.wins < standing.maximumWins;
      });

      return {
        ...standing,
        titleChance: getTitleChance(chanceOnPoints, chanceOnWins, isPointsTied),
      };
    }
  );

  const titleContenders = standingsWithTitleChance.filter(
    (standing) => standing.titleChance === TitleChance.POTENTIAL
  );

  if (titleContenders.length === 1) {
    return standingsWithTitleChance.map((standing) => {
      if (isDriverStanding(standing) && isDriverStanding(titleContenders[0])) {
        if (titleContenders[0].Driver === standing.Driver) {
          return {
            ...standing,
            titleChance: TitleChance.SECURED,
          };
        }

        return {
          ...standing,
          titleChance: TitleChance.NONE,
        };
      }

      if (
        isConstructorStanding(standing) &&
        isConstructorStanding(titleContenders[0])
      ) {
        if (titleContenders[0].Constructor === standing.Constructor) {
          return {
            ...standing,
            titleChance: TitleChance.SECURED,
          };
        }

        return {
          ...standing,
          titleChance: TitleChance.NONE,
        };
      }

      return standing;
    });
  }

  return standingsWithTitleChance;
}
