export type Entry = {
  name: string;
  points: number;
  wins: number;
  maximumPoints?: number;
  maximumWins?: number;
};

type DriverFields = {
  number: number;
  abbreviation: string;
  team: string;
};

export type ConstructorEntry = Entry;
export type DriverEntry = Entry & DriverFields;

export interface DriverResult {
  name: string;
  fastestLap: boolean;
}
