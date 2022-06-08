import { IRace, IRaceTable } from "../types/api";

export function getRemainingRaces(
  raceSchedule: IRaceTable,
  currentRound: number
) {
  const remainingRounds = raceSchedule.Races.filter(
    (race: IRace) => race.round > currentRound
  );

  const grandsPrix = remainingRounds.length;
  const sprintRaces = remainingRounds.filter(
    (race: IRace) => race.Sprint
  ).length;

  return {
    grandsPrix,
    sprintRaces,
  };
}
