export interface IDriver {
  driverId: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface IConstructor {
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

export type IStanding = {
  position: number;
  positionText: string;
  points: number;
  wins: number;
  maximumPoints?: number;
  maximumWins?: number;
  titleChance?: TitleChance;
};

type DriverStandingFields = {
  Driver: IDriver;
  Constructors: IConstructor[];
};

type ConstructorStandingFields = {
  Constructor: IConstructor;
};

export type IDriverStanding = IStanding & DriverStandingFields;
export type IConstructorStanding = IStanding & ConstructorStandingFields;

export interface IStandingsList {
  season: string;
  round: number;
  DriverStandings?: IDriverStanding[];
  ConstructorStandings?: IConstructorStanding[];
}

interface ICircuit {
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

interface IDateTime {
  date: string;
  time: string;
}

export interface IRace {
  season: string;
  round: number;
  url: string;
  raceName: string;
  Circuit: ICircuit;
  date: string;
  time: string;
  FirstPractice: IDateTime;
  SecondPractice: IDateTime;
  ThirdPractice?: IDateTime;
  Sprint?: IDateTime;
  Qualifying?: IDateTime;
}

export interface IRaceTable {
  season: number;
  Races: IRace[];
}

export interface IRaceResult {
  Driver: IDriver;
  Constructors: IConstructor[];
  fastestLap: boolean;
}

export enum RaceTypes {
  GRAND_PRIX,
  SPRINT_RACE,
}
