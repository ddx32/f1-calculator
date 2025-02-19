import { RaceEvent, RaceType } from "../types/entities";

export function getRemainingRaces(
  raceSchedule: RaceEvent[],
  currentRound: number
) {
  const remainingRounds = raceSchedule.filter(
    (race: RaceEvent) => race.Race.round > currentRound
  );

  const grandsPrix = remainingRounds.length;
  const sprintRaces = remainingRounds.filter(
    (race: RaceEvent) => race.eventType === RaceType.SPRINT_RACE
  ).length;

  return {
    grandsPrix,
    sprintRaces,
  };
}
