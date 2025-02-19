export interface Driver {
  driverId: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export enum TitleChance {
  SECURED = "SECURED",
  POTENTIAL = "POTENTIAL",
  NONE = "NONE",
}

export type Standing = {
  position: number;
  positionText: string;
  points: number;
  wins: number;
  maximumPoints?: number;
  maximumWins?: number;
  titleChance?: TitleChance;
};

type DriverStandingFields = {
  Driver: Driver;
  Constructors: Constructor[];
};

type ConstructorStandingFields = {
  Constructor: Constructor;
};

export type DriverStanding = Standing & DriverStandingFields;
export type ConstructorStanding = Standing & ConstructorStandingFields;

export interface StandingsList {
  season: string;
  round: number;
  DriverStandings?: DriverStanding[];
  ConstructorStandings?: ConstructorStanding[];
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: number;
    long: number;
    locality: string;
    country: string;
  };
}

export interface Race {
  season: string;
  round: number;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: Date;
  Qualifying: Date;
  SecondPractice?: Date;
  ThirdPractice?: Date;
  Sprint?: Date;
}

export interface RaceTable {
  season: number;
  Races: Race[];
}

export interface RaceResult {
  Driver: Driver;
  Constructors: Constructor[];
  fastestLap: boolean;
}

export enum StandingsType {
  CURRENT,
  CALCULATED,
}

export enum RaceType {
  GRAND_PRIX,
  SPRINT_RACE,
}

export interface RaceEvent {
  Race: Race;
  eventType: RaceType;
  id: string;
}

export interface UpcomingRaceResult {
  RaceEvent: RaceEvent;
  results: RaceResult[];
}
