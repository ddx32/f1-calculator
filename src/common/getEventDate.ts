import { RaceEvent, RaceType } from "../types/entities";

export function getEventDate(event: RaceEvent): Date | undefined {
  if (event.eventType === RaceType.SPRINT_RACE) {
    return event.Race.Sprint ? new Date(event.Race.Sprint) : undefined;
  }

  if (event.Race.date && event.Race.time) {
    return new Date(`${event.Race.date}T${event.Race.time}`);
  }

  return undefined;
}
