import { IRace, IRaceResult } from "./api";

export enum StandingsType {
  CURRENT,
  CALCULATED,
}

export enum RaceType {
  GRAND_PRIX,
  SPRINT_RACE,
}

export interface IRaceEvent {
  Race: IRace;
  eventType: RaceType;
  id: string;
}

export interface IUpcomingRaceResult {
  RaceEvent: IRaceEvent;
  results: IRaceResult[];
}
