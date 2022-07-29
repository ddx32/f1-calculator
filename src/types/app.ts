import { IRace, IRaceResult } from "./api";

export enum StandingsType {
  CURRENT,
  CALCULATED,
}

export interface IRaceEvent {
  Race: IRace;
  isSprintRace: boolean;
}

export interface IUpcomingRaceResults {
  RaceEvent: IRaceEvent;
  results: IRaceResult[];
}
