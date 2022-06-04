import { FASTEST_LAP_POINTS, POINTS_PER_POSITION } from "../constants/scoring";
import { IRaceTable, IStanding, TitleChance } from "../constants/types";
import { isDriverStanding, isConstructorStanding } from "../common/typeGuards";

function getRemainingEvents(raceSchedule: IRaceTable, currentRound: number) {
  const eventsRemaining = raceSchedule.Races.filter(
    (race) => race.round > currentRound
  );
  const grandsPrixRemaining = eventsRemaining.length;
  const sprintsRemaining = eventsRemaining.filter((race) => race.Sprint).length;

  return {
    grandsPrixRemaining,
    sprintsRemaining,
  };
}

function getRemainingDriverPoints(
  raceSchedule: IRaceTable,
  currentRound: number,
  bestPosition: number = 1
) {
  const { grandsPrixRemaining, sprintsRemaining } = getRemainingEvents(
    raceSchedule,
    currentRound
  );

  const grandsPrixPointsRemaining =
    grandsPrixRemaining * POINTS_PER_POSITION.fullGrandPrix[bestPosition - 1];
  const sprintPointsRemaining =
    sprintsRemaining * POINTS_PER_POSITION.sprintRace[bestPosition - 1];
  const fastestLapPointsRemaining =
    bestPosition === 1
      ? grandsPrixRemaining * grandsPrixPointsRemaining * FASTEST_LAP_POINTS
      : 0;

  return (
    grandsPrixPointsRemaining +
    sprintPointsRemaining +
    fastestLapPointsRemaining
  );
}

function getRemainingConstructorPoints(
  raceSchedule: IRaceTable,
  currentRound: number
) {
  return (
    getRemainingDriverPoints(raceSchedule, currentRound, 1) +
    getRemainingDriverPoints(raceSchedule, currentRound, 2)
  );
}

function getStandingsWithMaximumValues<T extends IStanding>(
  standings: T[],
  raceSchedule: IRaceTable,
  currentRound: number
) {
  const { grandsPrixRemaining } = getRemainingEvents(
    raceSchedule,
    currentRound
  );

  return standings.map((standing) => {
    if (isDriverStanding(standing)) {
      return {
        ...standing,
        maximumPoints:
          standing.points +
          getRemainingDriverPoints(raceSchedule, currentRound),
        maximumWins: grandsPrixRemaining,
      };
    }

    if (isConstructorStanding(standing)) {
      return {
        ...standing,
        maximumPoints:
          standing.points +
          getRemainingConstructorPoints(raceSchedule, currentRound),
        maximumWins: grandsPrixRemaining,
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

export function getStandingsWithTitleChance<T extends IStanding>(
  standings: T[],
  raceSchedule: IRaceTable,
  currentRound: number
) {
  const standingsWithMaximumValues = getStandingsWithMaximumValues(
    standings,
    raceSchedule,
    currentRound
  );

  if (!standingsWithMaximumValues.every((standing) => standing.maximumPoints)) {
    throw new Error("Standings in the list must contain maximumPoints");
  }

  const stadingsWithTitleChance = standingsWithMaximumValues.map(
    (standing, index) => {
      const others = standings.filter(
        (standing, listIndex) => index !== listIndex
      );

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

  const titleContenders = stadingsWithTitleChance.filter(
    (standing) => standing.titleChance === TitleChance.POTENTIAL
  );

  if (titleContenders.length === 1) {
    return stadingsWithTitleChance.map((standing) => {
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

  return stadingsWithTitleChance;
}
