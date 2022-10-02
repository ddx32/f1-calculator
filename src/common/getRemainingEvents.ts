import { IRaceEvent, RaceType } from "../types/app";

export function getRemainingEventList(
  raceSchedule: IRaceEvent[],
  lastRound: IRaceEvent
) {
  const lastEventIndex = raceSchedule.findIndex((event) => {
    return (
      event.Race.round === lastRound.Race.round &&
      event.eventType === lastRound.eventType
    );
  });

  return raceSchedule.slice(lastEventIndex + 1, raceSchedule.length);
}

export function getRemainingEventCount(
  raceSchedule: IRaceEvent[],
  lastRound: IRaceEvent
) {
  const remainingEvents = getRemainingEventList(raceSchedule, lastRound);

  return {
    grandsPrixRemaining: remainingEvents.filter(
      (event) => event.eventType === RaceType.GRAND_PRIX
    ).length,
    sprintsRemaining: remainingEvents.filter(
      (event) => event.eventType === RaceType.SPRINT_RACE
    ).length,
  };
}
